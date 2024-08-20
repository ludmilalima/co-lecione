import { ContributeType } from "../../util.model";

export class ContributeLifeCycle extends ContributeType {
    override role: LifeCycleRoles;
}

enum LifeCycleRoles {
    author = 'author',
    publisher = 'publisher',
    unknown = 'unknown',
    initiator = 'initiator',
    terminator = 'terminator',
    validator = 'validator',
    editor = 'editor',
    graphicalDesigner = 'graphical designer',
    technicalImplementer = 'technical implementer',
    contentProvider = 'content provider',
    technicalValidator = 'technical validator',
    educationalValidator = 'educational validator',
    scriptWriter = 'script writer',
    instructionalDesigner = 'instructional designer',
    subjectMatterExpert = 'subject matter expert',
}