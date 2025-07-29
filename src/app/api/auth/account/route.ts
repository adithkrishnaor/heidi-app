import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongoose';
import { User } from '../../../../../models/User';

// GET handler - Get user account data
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    // Find user by email (excluding password)
    const user = await User.findOne({ email: email.toLowerCase() }, '-password');
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name || '',
        email: user.email,
        image: user.image || null,
        phone: user.phone || '',
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      }
    });

  } catch (error: unknown) {
    console.error('Error fetching user account:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to fetch user account: ${error.message}` },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to fetch user account' },
        { status: 500 }
      );
    }
  }
}

// PUT handler - Update user account
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { email, name, phone, password, confirmPassword } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find the user first
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    
    if (name !== undefined && name.trim() !== '') {
      updateData.name = name.trim();
    }

    if (phone !== undefined) {
      updateData.phone = phone.trim();
    }

    // Handle password update if provided
    if (password && password.trim() !== '') {
      // Validate password
      if (password.length < 6) {
        return NextResponse.json(
          { error: 'Password must be at least 6 characters long' },
          { status: 400 }
        );
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        return NextResponse.json(
          { error: 'Passwords do not match' },
          { status: 400 }
        );
      }

      updateData.password = password; // Store as plain text as per your current setup
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      updateData,
      { new: true, select: '-password' }
    );

    return NextResponse.json({
      success: true,
      message: 'Account updated successfully',
      user: {
        id: updatedUser._id.toString(),
        name: updatedUser.name || '',
        email: updatedUser.email,
        phone: updatedUser.phone || '',
        image: updatedUser.image || null,
        updatedAt: updatedUser.updatedAt.toISOString()
      }
    });

  } catch (error: unknown) {
    console.error('Error updating user account:', error);

    // Handle mongoose validation errors
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError') {
      const validationError = error as unknown as { errors: Record<string, { message: string }> };
      const validationErrors = Object.values(validationError.errors).map(err => err.message);
      return NextResponse.json(
        { error: validationErrors.join(', ') },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to update account: ${error.message}` },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to update account' },
        { status: 500 }
      );
    }
  }
}