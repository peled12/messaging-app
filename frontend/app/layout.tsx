import NavBar from "./components/NavBar";
import "./globals.css";

/*
  TODO: create a loading page
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <div className="custom-loader"></div>
      </body>
    </html>
  );
}
