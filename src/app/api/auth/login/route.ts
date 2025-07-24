import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongoose';
import User from '../../../../models/User';

// POST handler - User login
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password (plain text comparison as requested)
    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Login successful - return user data without password
    const userResponse = {
      id: user._id.toString(),
      email: user.email,
      createdAt: user.createdAt.toISOString()
    };

    return NextResponse.json({
      message: 'Login successful',
      user: userResponse
    });

  } catch (error: unknown) {
    console.error('Login error:', error);
    
    // Type guard to handle the error properly
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Login failed: ${error.message}` },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
}