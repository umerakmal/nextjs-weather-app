import jwt from 'jsonwebtoken';

export function verifyAuth(callback) {
  return (req) => {
    const token = req.cookies.get('token');
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return callback(req);
    } catch (error) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
  };
}
