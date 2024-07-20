import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) {
      navigate(`/auth?createNew=${longUrl}`);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center my-10 sm:my-16 text-3xl sm:text-5xl lg:text-6xl text-white font-extrabold">
        Shorten with Precision <br />
        Track with Clarity.
      </h1>
      <form
        onSubmit={handleShorten}
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/3 gap-2"
      >
        <Input
          type="url"
          placeholder="Enter the URL"
          className="h-full flex-1 py-4 px-10"
          onChange={(e) => {
            setLongUrl(e.target.value);
          }}
          value={longUrl}
        />
        <Button className="h-full" type="submit" variant="destructive">
          Shorten!
        </Button>
      </form>
      <div className="flex max-w-screen gap-5 flex-wrap md:flex-nowrap justify-center my-11 md:px-11">
        <img src="/banner-1.png" alt="" className="md:w-1/2 md:h-1/2" />
        <img src="/banner-2.png" alt="" className="md:w-1/2 md:h-1/2" />
      </div>
      <Accordion type="multiple" collapsible className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How does LinkMetrics URL shortner works?
          </AccordionTrigger>
          <AccordionContent>
            When provided with a URL it generates a shorter version of it which
            redirects to the original URL when accessed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Do I need to create a Account?</AccordionTrigger>
          <AccordionContent>
            Yes. Creating an account helps in managing various urls and its
            analytics
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            What analytics are available for the short URL?
          </AccordionTrigger>
          <AccordionContent>
            The analytics for number of clicks and geolocation data and device
            type ( mobile / desktop ) for each of your shortened URL
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Landing;
