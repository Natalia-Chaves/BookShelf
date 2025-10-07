import bcrypt from 'bcryptjs';
import db from '../config/database.js';
import { generateToken } from '../middleware/auth.js';

export const signup = async (req, res) => {
  try {
  console.log('Signup request body:', req.body);
  const { email, password, fullName } = req.body;

    // Validação dos campos obrigatórios
      const { name, username } = req.body;
      const userName = fullName || name || username;
      if (!email || !password || !userName) {
      return res.status(400).json({ error: 'Email, password e nome são obrigatórios.' });
    }

    // Check if user already exists
    const existingUser = db.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Já existe uma conta cadastrada com esse e-mail.' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
      const newUser = db.createUser({
        email,
        password: hashedPassword,
        full_name: userName,
    });

    // Generate token
    const token = generateToken(newUser);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        full_name: newUser.full_name,
      },
      token,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = db.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      message: 'Sign in successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
      },
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const signout = async (req, res) => {
  try {
    // With JWT, we just tell the client to remove the token
    res.json({ message: 'Sign out successful' });
  } catch (error) {
    console.error('Signout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = db.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // In a real app, you'd send an email with a reset token
    // For demo purposes, we'll just return a success message
    res.json({ 
      message: 'Password reset instructions would be sent to your email',
      // In demo mode, we could return a temporary reset token
      resetToken: 'demo-reset-token-123'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Hash new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update user password in database
    const users = db.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users[userIndex].password = hashedPassword;
    db.saveUsers(users);

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};