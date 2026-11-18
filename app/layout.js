import './globals.css';

export const metadata = {
  title: 'Tic-Tac-Toe',
  description: 'A small Tic-Tac-Toe game built with React and Next.js',
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
