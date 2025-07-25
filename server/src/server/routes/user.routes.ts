import express from 'express';
import UserModel, { User } from '../models/user';
import bcrypt from 'bcrypt';
import { verifyToken } from '../controllers/session.controller';
import jwt, { JwtPayload } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

export const userRouter = express.Router();
userRouter.use(express.json());

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users.
 */
userRouter.get('/', async (_req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /users/id/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object.
 *       404:
 *         description: User not found.
 */
userRouter.get('/id/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send(`Failed to find a user: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find a user: ID ${req.params.id}`);
  }
});

/**
 * @swagger
 * /users/check-email/{email}:
 *   get:
 *     summary: Check if an email is registered
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A boolean indicating if the email is registered.
 */
userRouter.get('/check-email/:email', async (req, res) => {
  try {
    const email = req.params.email;

    // Verifique se o e-mail já está cadastrado no banco de dados
    const existingUser = await UserModel.findOne({ email });

    // Se o e-mail já existe, retorne true; caso contrário, retorne false
    const isEmailRegistered = !!existingUser;
    res.json({ isEmailRegistered });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: The ID of the created user.
 */
userRouter.post('/register', verifyToken, async (req, res) => {
  try {
    const userData = req.body;
    // Criptografe a senha do usuário usando o bcrypt
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    // Crie um novo usuário com a senha criptografada
    const newUser = new UserModel({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });
    const result = await newUser.save();

    if (result) {
      res.status(201).json({ userId: result._id });
    } else {
      throw new Error("Falha ao criar usuário!");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: A JWT token.
 */
userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Encontre o usuário com o e-mail fornecido
    const user = await UserModel.findOne({ email });

    if (!user) {
      // Usuário não encontrado
      return res.status(404).send('Usuário não encontrado.');
    }

    // Verifique se a senha fornecida corresponde à senha armazenada no banco de dados
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Senha inválida
      return res.status(401).send('Senha inválida.');
    }

    // Gere um token JWT com o ID do usuário como payload
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

    // Retorne o token como resposta
    res.status(200).send(token);

  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Log out a user
 *     responses:
 *       200:
 *         description: Successfully logged out.
 */

userRouter.post('/logout', async (req, res) => {

  // Realize outras ações de logout necessárias
  /*
   * No backend, JWT tokens are stateless and cannot be invalidated server-side unless you implement a token blacklist.
   * To "cancel" a token, you can:
   * 1. Store invalidated tokens in a blacklist (e.g., in-memory, Redis, or database) and check this list on each request.
   * 2. Change a secret key (invalidates all tokens, not just one).
   */

  return res.clearCookie('auth_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
  }).status(200).send('Cookie logout realizado com sucesso.');
});

/**
 * @swagger
 * /users/currentUser:
 *   get:
 *     summary: Retrieve the currently logged in user
 *     responses:
 *       200:
 *         description: A user object.
 */
userRouter.get('/currentUser', verifyToken, async (req, res) => {
  const userId = req.body.userId; // Obtenha o ID do usuário autenticado
  try {
    let user = null;
    if (userId == 'CookieOnly') {
      user = { email: 'cookie-only@email.com', name: 'CookieOnly' };
    } else {
      const userDoc = await UserModel.findById(userId).select('name email');
      user = userDoc ? { name: userDoc.name, email: userDoc.email } : null;
    }
    if (user != null) {
      res.status(200).json(user);
    } else {
      res.status(404).send('Usuário não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao obter informações do usuário:', error);
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the user.
 */
userRouter.put('/:id', verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const userData = req.body;
    const result = await UserModel.findByIdAndUpdate(id, userData);

    if (result) {
      res.status(200).send(`Updated a user: ID ${id}.`);
    } else {
      res.status(404).send(`Failed to find a user: ID ${id}`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Successfully deleted the user.
 */
userRouter.delete('/:id', verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await UserModel.findByIdAndDelete(id);

    if (result) {
      res.status(202).send(`Removed a user: ID ${id}`);
    } else {
      res.status(404).send(`Failed to find a user: ID ${id}`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

userRouter.post('/cookie-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    const auth_secret_key = process.env.AUTH_SECRET_KEY;

    if (email == 'admin@email.com') {
      const admin_password = process.env.ADMIN_PASSWORD;
      const admin_session = Number(process.env.ADMIN_SESSION);
      // const isPasswordValid = await bcrypt.compare(admin_password, password);
      const isPasswordValid = admin_password == password;

      if (isPasswordValid) {
        // expiresIn sets token expiration
        const token = jwt.sign({ email: email }, auth_secret_key, { expiresIn: admin_session });

        res.cookie('auth_token', token, {
          httpOnly: true,
          secure: true, // true se usar HTTPS
          sameSite: 'none',
          maxAge: admin_session * 1000, //sets cookie expiration
        });

        return res.status(200).json({ message: 'Login admin bem-sucedido' });
      }
      return res.status(401).send('Senha admin inválida.');
    }

    if (email == 'operator@email.com') {
      const operator_password = process.env.OPERATOR_PASSWORD;
      const operator_session = Number(process.env.OPERATOR_SESSION);
      // const isPasswordValid = await bcrypt.compare(operator_password, password);
      const isPasswordValid = operator_password == password;

      if (isPasswordValid) {
        const token = jwt.sign({ email: email }, auth_secret_key, { expiresIn: operator_session });

        res.cookie('auth_token', token, {
          httpOnly: true,
          secure: true, // true se usar HTTPS
          sameSite: 'none',
          maxAge: operator_session * 1000,
        });

        return res.status(200).json({ message: 'Login operator bem-sucedido' });
      }
      return res.status(401).send('Senha operator inválida.');
    }

    if (!user) {
      // Usuário não encontrado
      return res.status(404).send('Usuário não encontrado.');
    }

    // Verifique se a senha fornecida corresponde à senha armazenada no banco de dados
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Senha inválida
      return res.status(401).send('Senha inválida.');
    }

    if (user && isPasswordValid) {
      const token = jwt.sign({ email: user.email }, auth_secret_key, { expiresIn: '120' });

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: true, // true se usar HTTPS
        sameSite: 'none',
        maxAge: 2 * 60 * 1000
      });

      return res.status(200).json({ message: 'Login bem-sucedido' });
    }

    res.status(401).json({ message: 'Credenciais inválidas' });

  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(500).send(error);
  }
});

userRouter.get('/cookie-user', async (req, res) => {
  const cookieToken = req.cookies.auth_token;

  try {
    const decoded = jwt.verify(cookieToken, process.env.AUTH_SECRET_KEY);
    req.body = { email: (decoded as JwtPayload).email }
    res.status(200).json({ message: `Usuário ${(decoded as JwtPayload).email} logou com sucesso.` });
  } catch {
    res.status(401).json({ message: 'Cookie token inválido ou expirado' });
  }
});