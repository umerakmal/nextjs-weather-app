import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/utils/db';
import User from '@/models/User';

connectDB();

export async function POST(req) {
  const { name, email, password } = await req.json();
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  return NextResponse.json({ message: 'User created successfully' });
}
