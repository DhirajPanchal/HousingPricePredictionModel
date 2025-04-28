"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useAppContext } from "../../context/AppContext";

export default function LocationLoader() {
  const { location } = useParams<{ location: string }>();
  const { modules } = useAppContext();

  const [loading, setLoading] = useState(true);
  const [iframeUrl, setIframeUrl] = useState("");

  const REMOTE_URLS = useMemo(() => {
    const map: Record<string, string> = {};
    modules.forEach((mod) => {
      map[mod.route] = mod.location;
    });
    return map;
  }, [modules]);

  useEffect(() => {
    if (location && REMOTE_URLS[location]) {
      console.log("***" + location + " : " + REMOTE_URLS[location]);

      setIframeUrl(REMOTE_URLS[location]);
      setLoading(true);
    } else {
      setIframeUrl("");
      setLoading(false); // Stop loading if invalid location
    }
  }, [location, REMOTE_URLS]);

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-white relative px-4">
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-gray-600 text-lg mb-4">Loading {location}...</p>
          <div className="spinner" />
        </div>
      )}
      {iframeUrl ? (
        <iframe
          sandbox="allow-scripts allow-same-origin allow-forms"
          src={iframeUrl}
          className="w-full h-[calc(100vh-8rem)] border-none"
          onLoad={() => setLoading(false)}
        />
      ) : (
        !loading && (
          <div className="text-center text-gray-500">
            <p>
              Service not found for <strong>{location}</strong>.
            </p>
            <p>
              Click on the brand logo on top left to login again and try through
              Your Applications page.
            </p>
          </div>
        )
      )}

      <style jsx>{`
        .spinner {
          margin: 0 auto;
          border: 6px solid #f3f3f3;
          border-top: 6px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
