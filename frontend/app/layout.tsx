import NavBar from "./components/NavBar";
import { UserProvider } from "./contexts/UserContexts";
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
        <UserProvider>
          <NavBar />
          {children}
        </UserProvider>
        <div className="custom-loader"></div>
      </body>
    </html>
  );
}
