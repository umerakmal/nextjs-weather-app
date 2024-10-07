import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/utils/db';
import User from '@/models/User';

export async function POST(req) {
  await connectDB();

  const { name, email, password } = await req.json();

  // Debugging log
  console.log("Received Data:", { name, email, password });

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  // Save to DB
  await user.save();

  return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
}
