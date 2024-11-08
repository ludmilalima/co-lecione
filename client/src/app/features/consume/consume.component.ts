import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { ActivatedRoute } from "@angular/router";
import { CardsComponent } from "src/app/components/reusable/cards/cards.component";
import { QuestionComponent } from "src/app/components/reusable/question/question.component";
import { ItinerariesService } from "../create/itineraries/itineraries.service";
import { Itineraries } from "../create/itineraries/itineraries.model";
import { Objects } from "../create/objects/objects.model";
import { ObjectsService } from "../create/objects/objects.service";
import { ConvertByTypeService } from "src/app/shared/services/convert-by-type.service";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NotificationsService } from "src/app/shared/notifications/notifications.service";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import { UserService } from "src/app/components/admin-user/user.service";
import { EmailSenderService } from "src/app/shared/services/email-sender.service";
import { MatDialog } from "@angular/material/dialog";
import { EmailDialogComponent } from "./email-destination-dialog/email-dialog.component";
import { FormGroup } from "@angular/forms";
import { ConfirmationDialogService } from "src/app/shared/confirmation-dialog/confirmation-dialog.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-consume",
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,

    CardsComponent,
    QuestionComponent,

    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: "./consume.component.html",
  styleUrl: "./consume.component.scss",
})
export class ConsumeComponent implements OnInit {
  itinerary: Itineraries | null = null;
  loadedObjects: Array<Objects> = [];
  emailForm: FormGroup;
  pdf: jsPDF;

  constructor(
    private route: ActivatedRoute,
    private _notificationsService: NotificationsService,
    private _itinerariesService: ItinerariesService,
    private _objectsService: ObjectsService,
    private _convertByType: ConvertByTypeService,
    private _userService: UserService,
    private _emailSenderService: EmailSenderService,
    private _confirmationDialogService: ConfirmationDialogService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.getItineraryById(id);
      }
    });
  }

  getItineraryById(id: string): void {
    this._itinerariesService.getItineraryById(id).subscribe((response) => {
      this.itinerary = response;
      this.getObjects();
    });
  }

  getObjects(): void {
    if (!this.itinerary || !this.itinerary.content) {
      console.error("Itinerary or itinerary content is undefined.");
      return;
    }

    this.itinerary.content.forEach((object, index) => {
      if (!object || !object.objectId) {
        console.error(`Object or objectId is undefined at index ${index}.`);
        return;
      }

      this._objectsService
        .getObjectById(object.objectId)
        .subscribe((response) => {
          if (response) {
            this.loadedObjects[index] = this.convertContent(response);
          } else {
            console.error(`Object with ID ${object.objectId} not found.`);
          }
        });
    });
  }

  convertContent(object: any) {
    if (!object) {
      console.error("Object is undefined or null.");
      return null;
    }

    if (!object._id || !object.type || !object.content || !object.metadata) {
      console.error("Object properties are missing.");
      return null;
    }

    return {
      _id: object._id,
      type: object.type,
      content: object.content.reduce((acc: any, curr: any) => {
        return {
          ...acc,
          [curr.key]: this._convertByType.convertType(curr.value),
        };
      }, {}),
      metadata: object.metadata.reduce((acc: any, curr: any) => {
        return {
          ...acc,
          [curr.key]: curr.value,
        };
      }, {}),
    };
  }

  shareItinerary(itinerary: Itineraries) {
    let link: URL = new URL(
      environment.clientUrl + "/consumir/" + itinerary._id
    );
    navigator.clipboard.writeText(link.toString());
    this._notificationsService.info(
      "Link copiado!",
      "O link deste foi copiado para a área de transferência.",
      5000
    );
  }

  downloadPdf(): void {
    this.getUserInfo();
    if (localStorage.getItem("token") == null) {
      this._confirmationDialogService.openDialog(
        `Não há conta logada no momento, o arquivo será baixado anonimamente. Deseja continuar?`,
        () => this.downloadPdfAnonymously(),
        null
      );
    } else {
      this.onGeneratePdf(this.itinerary, this.loadedObjects, "download").then(
        () => this.savePdf()
      );
    }
  }

  sendPdfByEmail(): void {
    this.getUserInfo();
    if (localStorage.getItem("token") == null) {
      this._confirmationDialogService.openDialog(
        `Não há conta logada no momento, o arquivo será enviado anonimamente. Deseja continuar?`,
        () => this.openEmailDialog(),
        null
      );
    } else {
      this.openEmailDialog();
    }
  }

  downloadPdfAnonymously(): void {
    this.onGeneratePdf(this.itinerary, this.loadedObjects, "download").then(
      () => this.savePdf()
    );
  }

  getObjectType(id: string): string {
    const item = this.loadedObjects
      ?.filter((obj) => obj !== undefined && obj !== null)
      .find((obj) => obj._id === id);
    return item ? item.type : "undefined";
  }

  getObjectContent(id: string): any {
    const item = this.loadedObjects
      ?.filter((obj) => obj !== undefined && obj !== null)
      .find((obj) => obj._id === id);
    return item ? item.content : null;
  }

  getUserInfo(): any {
    this._userService.getUserInfo();
  }

  openEmailDialog(): void {
    const dialogRef = this.dialog.open(EmailDialogComponent, {
      width: "80%",
      data: {
        emailForm: this.emailForm,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.emailForm = result;
        this.onGeneratePdf(this.itinerary, this.loadedObjects, "send").then(
          () => this.sendPdf()
        );
      }
    });
  }

  async onGeneratePdf(
    itinerary: Itineraries,
    objects: Array<any>,
    operation: string
  ) {
    await this.generatePdf(itinerary, objects, operation);
  }

  async generatePdf(
    itinerary: Itineraries,
    objects: Array<any>,
    operation: string
  ): Promise<void> {
    if (this.pdf == undefined) {
      let promises: Promise<{ index: number; dataUrl: string | null }>[] = [];

      for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];
        const index = i;
        const element = document.getElementById(`content-${obj._id}`);

        if (element) {
          element.style.whiteSpace = "normal";
          element.style.width = "auto";
          element.style.height = "auto";

          await replaceImageUrlsWithDataUrls(element);

          const promise = domtoimage
            .toPng(element, { cacheBust: true, useCORS: true })
            .then((dataUrl) => {
              return { index, dataUrl };
            })
            .catch((error) => {
              console.error("Error generating image:", error);
              return { index, dataUrl: null };
            });

          promises.push(promise);
        } else {
          promises.push(Promise.resolve({ index, dataUrl: null }));
        }
      }

      const results = await Promise.all(promises);
      let pdf = new jsPDF({
        format: "a4",
        unit: "mm",
        orientation: "portrait",
        compress: true,
      });

      let userInfo = {
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
      };
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 10; // Define a margin of 10mm
      let y = 20; // Initial y position

      // Add Roteiro Information
      let title = JSON.parse(
        itinerary.metadata.find((item) => item.key == "general.title").value
      ).content;
      const titleLines = pdf.splitTextToSize(
        `Roteiro:\n${title}`,
        pageWidth - 2 * margin
      );
      pdf.text(titleLines, margin, y);
      y += titleLines.length * 10; // Adjust y position based on the number of lines

      let description = JSON.parse(
        itinerary.metadata.find((item) => item.key == "general.description")
          .value
      ).content;
      const descriptionLines = pdf.splitTextToSize(
        `Descrição:\n${description}`,
        pageWidth - 2 * margin
      );
      pdf.text(descriptionLines, margin, y);
      y += descriptionLines.length * 10; // Adjust y position based on the number of lines

      const currentUrl = window.location.href;
      pdf.setTextColor(0, 0, 255); // Set text color to blue
      pdf.textWithLink(
        `Clique neste texto para acessar o roteiro original.`,
        margin,
        y,
        { url: currentUrl }
      );
      pdf.setTextColor(0, 0, 0); // Reset text color to black
      y += 10;

      if (userInfo.name != null || userInfo.email != null) {
        pdf.text(`Usuário: ${userInfo.name} (${userInfo.email})`, margin, y);
        y += 10;
      }

      const exportDate = new Date();
      pdf.text(
        `Data da exportação: ${exportDate.toLocaleDateString()} ${exportDate.toLocaleTimeString()}`,
        margin,
        y
      );
      y += 20; // Add extra space before the sumário

      // Add content
      for (const result of results) {
        if (result.dataUrl) {
          const imgData = result.dataUrl;
          const imgProps = pdf.getImageProperties(imgData);

          let imgWidth = imgProps.width * 0.264583; // Convert width to mm
          let imgHeight = imgProps.height * 0.264583; // Convert height to mm

          let pageHeightMm = imgProps.height * 0.264583 + 2 * margin;
          let pageWidthMm = imgProps.width * 0.264583 + 2 * margin;

          const orientation =
            pageWidthMm > pageHeightMm ? "landscape" : "portrait";
          pdf.addPage([pageWidthMm, pageHeightMm], orientation);
          pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        }
      }

      // Add TOC entries
      pdf.addPage("a4", "portrait");
      y = 20;

      // Add Table of Contents
      pdf.text("Sumário", margin, y);
      y += 10;

      for (const result of results) {
        if (result.dataUrl) {
          if (y + 10 > pdf.internal.pageSize.getHeight() - margin) {
            pdf.addPage();
            y = margin;
          }

          let title = `Objeto ${result.index + 1}`;
          switch (objects[result.index].type) {
            case "question":
              title += ` - ${objects[result.index].content.topic}`;
              break;

            case "card":
              title += ` - ${objects[result.index].content.title}`;
              break;
          }

          pdf.textWithLink(title, margin, y, {
            pageNumber: result.index + 2,
          });
          y += 10;
        }
      }

      this.pdf = pdf;

      // if (operation === 'download') {
      //   this.pdf.save('roteiro.pdf');
      // } else if (operation === 'send') {
      //   const pdfData = this.pdf.output('blob')

      //   let itineraryName = JSON.parse(itinerary.metadata.find(item => item.key == 'general.title').value).content;

      //   let mailLoad = {
      //     destination: this.emailForm.get('destination').value as string,
      //     pdfData: pdfData as Blob,
      //     subject: `Roteiro: ` + itineraryName,
      //     cc: userInfo.email ? userInfo.email as string : null,
      //     message: (this.emailForm.get('message').value ? this.convertTextToHtml(this.emailForm.get('message').value) : 'Não foram adicionadas informações adicionais.') as string,
      //   }

      //   this._emailSenderService.sendEmailWithAttachment(mailLoad).subscribe({
      //     next: response => {
      //       this._notificationsService.success('Sucesso!', 'Email enviado com sucesso.', 5000);
      //     },
      //     error: error => {
      //       console.error('Error sending email', error);
      //     }
      //   });
      // }
    }
  }

  savePdf() {
    if (this.pdf != undefined) {
      this.pdf.save("roteiro.pdf");
    }
  }

  sendPdf() {
    if (this.pdf != undefined) {
      const pdfData = this.pdf.output("blob");
      let userInfo = {
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
      };

      let itineraryName = JSON.parse(
        this.itinerary.metadata.find((item) => item.key == "general.title")
          .value
      ).content;

      let mailLoad = {
        destination: this.emailForm.get("destination").value as string,
        pdfData: pdfData as Blob,
        subject: `Roteiro: ` + itineraryName,
        cc: userInfo.email ? (userInfo.email as string) : null,
        message: (this.emailForm.get("message").value
          ? this.convertTextToHtml(this.emailForm.get("message").value)
          : "Não foram adicionadas informações adicionais.") as string,
      };

      this._emailSenderService.sendEmailWithAttachment(mailLoad).subscribe({
        next: (response) => {
          this._notificationsService.success(
            "Sucesso!",
            "Email enviado com sucesso.",
            5000
          );
        },
        error: (error) => {
          console.error("Error sending email", error);
        },
      });
    }
  }

  convertTextToHtml(text: string): string {
    // Substituir quebras de linha simples por <br>
    const withBreaks = text.replace(/\n/g, "<br>");

    // Envolver parágrafos em <p>
    const paragraphs = withBreaks
      .split("<br><br>")
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join("");

    return paragraphs;
  }
}

async function replaceImageUrlsWithDataUrls(
  element: HTMLElement
): Promise<void> {
  const images = element.querySelectorAll("img");
  const promises = Array.from(images).map(async (img) => {
    const url = img.src;
    const dataUrl = await convertImageUrlToDataUrl(url);
    img.src = dataUrl;
  });

  await Promise.all(promises);
}

async function convertImageUrlToDataUrl(url: string): Promise<string> {
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
      url
    )}`;
    const response = await fetch(proxyUrl, {
      mode: "cors",
      credentials: "same-origin",
    });
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error fetching image with first proxy:", error);
    try {
      const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`;
      const response = await fetch(proxyUrl, {
        mode: "cors",
        credentials: "same-origin",
      });
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error fetching image with second proxy:", error);
      throw error;
    }
  }
}
