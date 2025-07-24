import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongoose';
import User from '../../../../models/User';

// GET handler - Get all users
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Get query parameters for pagination
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Get users without password field
    const users = await User.find({}, '-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST handler - Create new user
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { email, password, confirmPassword } = body;

    // Validation
    if (!email || !password || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email, password, and confirm password are required'
        },
        { status: 400 }
      );
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: 'Passwords do not match'
        },
        { status: 400 }
      );
    }

    // Check password length
    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: 'Password must be at least 6 characters long'
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'User with this email already exists'
        },
        { status: 409 }
      );
    }

    // Create new user (no password hashing as requested)
    const newUser = new User({
      email: email.toLowerCase(),
      password: password // Storing as plain text as requested
    });

    const savedUser = await newUser.save();

    // Return success response (without password)
    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
        user: {
          id: savedUser._id.toString(),
          email: savedUser.email,
          createdAt: savedUser.createdAt.toISOString()
        }
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error creating user:', error);

    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        {
          success: false,
          message: validationErrors.join(', ')
        },
        { status: 400 }
      );
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: 'User with this email already exists'
        },
        { status: 409 }
      );
    }

    // Generic error
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create user'
      },
      { status: 500 }
    );
  }
}