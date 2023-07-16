import "./globals.css";
import { Inter } from "next/font/google";
import Image from "next/image";
import Searchbar from "../components/searchbar";
import QueryContext from "../components/QueryContext";
import Link from "next/link";
import { redirect } from "next/navigation";
import ActiveLink from "../components/ActiveLink";
// import OfflineBanner from "@/components/OfflineBanner";
// import "@/worker/offline_worker";
import mysql from "mysql2/promise";
import { SnackContextProvider } from "@/components/SnackContext";
import { AuthControls } from "@/components/AuthControls";

const atkinsonHyper = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const pool = mysql.createPool(process.env.DATABASE_URL || "");

export const connection = mysql.createConnection(
  process.env.DATABASE_URL || ""
);
export const connectDB = async () => {
  try {
    // TODO: There is some problem with new version of mongoose, need to read the docs
    const connection = await mysql.createConnection(
      process.env.DATABASE_URL || ""
    );
    await connection.connect();
    return connection;
  } catch (error: any) {
    process.exit(1);
  }
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const handleSubmitSearch = async (data: FormData) => {
    "use server";
    redirect(`/browse?keyword=${data.get("keyword")}`);
  };

  return (
    <html lang="en" className="scroll-pt-[116px]">
      {/* <header> */}
      {/*   <link rel="preload" as="image/svg+xml" href="/actions.svg" /> */}
      {/* </header> */}
      <body className={atkinsonHyper.className + " bg-default overflow-y-auto"}>
        <QueryContext>
          <SnackContextProvider>
            <header
              className="px-4 sm:px-8 md:px-12 lg:px-24 xl:px-44 py-2
            flex items-center justify-between 
            bg-paper 
            fixed top-0 w-full z-20"
            >
              <Link href={`/`}>
                <Image
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/images-b3099.appspot.com/o/269863143_480068400349256_2256909955739492979_n.png?alt=media&token=3a12e3c5-a40d-4747-8607-a42eb4917cd2"
                  }
                  alt={"logo-of-a-penguine"}
                  width={40}
                  height={40}
                />
              </Link>
              <div className="flex gap-2 text-sm h-full px-4 text-white_primary items-center">
                <form action={handleSubmitSearch}>
                  <Searchbar />
                </form>
                <AuthControls />
              </div>
            </header>
            <nav
              className="px-4 sm:px-8 md:px-12 lg:px-24 xl:px-44 
              flex gap-4 
              bg-default/90 backdrop-blur-lg 
              fixed w-full top-[56px] z-10"
            >
              <ActiveLink
                matches={[{ name: "/", exact: true }, { name: "discover" }]}
              >
                <Link
                  className="text-sm text-white/60 py-4 hover:text-white_primary transition-colors"
                  href={"/"}
                >
                  Discover
                </Link>
              </ActiveLink>
              <ActiveLink match="browse">
                <Link
                  className="text-sm text-white/60 py-4 hover:text-white_primary transition-colors"
                  href={"/browse"}
                >
                  Browse
                </Link>
              </ActiveLink>
            </nav>
            <main className="px-4 lg:px-24 xl:px-44 pt-[116px] pb-16 text-white_primary">
              {/* <OfflineBanner /> */}
              {children}
              {modal}
            </main>
          </SnackContextProvider>
        </QueryContext>
      </body>
    </html>
  );
}
