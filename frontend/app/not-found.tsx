import Link from "next/link";
import React from "react";

function notFound() {
  return (
    <div className="flex justify-center mt-20">
      <div className="text-center">
        <h1 className="text-6xl mb-4">Oops...</h1>
        <p className="mb-10">We couldn't find what you're looking for :(</p>
        <Link className="custom-btn" href={"/"}>
          To Home Page
        </Link>
      </div>
    </div>
  );
}

export default notFound;
