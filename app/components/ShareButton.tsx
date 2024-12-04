import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Share2, Twitter, Link2, CheckCircle2 } from "lucide-react";
// import { useToast } from "~/hooks/use-toast";

interface ShareButtonProps {
  title?: string;
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}
let isHydrating = true;

export default function ShareButton({
  variant = "default",
  size = "lg",
  className,
}: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isHydrated, setIsHydrated] = useState(!isHydrating);
  let url: string;
  if (typeof window !== "undefined") {
    url = window.location.href;
  }

  useEffect(() => {
    isHydrating = false;
    setIsHydrated(true);
  }, []);

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      "Just discovered this awesome stack on Stack Review! 🚀 Check it out:  #TechStack #StackReview"
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank");
    setOpen(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      // toast({
      //   title: "Link copied!",
      //   description: "The link has been copied to your clipboard.",
      // });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // toast({
      //   title: "Failed to copy",
      //   description: "Please try again.",
      //   variant: "destructive",
      // });
    }
  };

  if (isHydrated) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={variant}
            size={size}
            className={`gap-2 ${className}`}
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share this Stack</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button
              variant="outline"
              className="flex items-center justify-start gap-2 h-14"
              onClick={shareToTwitter}
            >
              <Twitter className="w-5 h-5 text-[#1DA1F2]" />
              <div className="flex flex-col items-start">
                <span className="font-semibold">Share on Twitter</span>
                <span className="text-sm text-muted-foreground">
                  Post this page to your feed
                </span>
              </div>
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-start gap-2 h-14"
              onClick={copyToClipboard}
            >
              {copied ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <Link2 className="w-5 h-5" />
              )}
              <div className="flex flex-col items-start">
                <span className="font-semibold">Copy link</span>
                <span className="text-sm text-muted-foreground">
                  Copy the page URL to your clipboard
                </span>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  } else {
    return null;
  }
}
