import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReferralCodeProps {
  code: string;
}

export default function ReferralCode({ code }: ReferralCodeProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    toast({
      title: "Share link",
      description: "Sharing functionality will be available soon",
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Your Referral Code</h3>
      <div className="border-2 border-dashed border-border rounded-lg p-4 mb-4 text-center">
        <p className="text-3xl font-mono font-bold text-primary" data-testid="text-referral-code">
          {code}
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleCopy}
          data-testid="button-copy-code"
        >
          {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
          {copied ? "Copied" : "Copy Code"}
        </Button>
        <Button
          variant="default"
          className="flex-1"
          onClick={handleShare}
          data-testid="button-share"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </Card>
  );
}
