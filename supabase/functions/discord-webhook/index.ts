import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  business?: string;
  message: string;
}

interface DiscordEmbed {
  title: string;
  description: string;
  color: number;
  fields: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
  timestamp: string;
  footer: {
    text: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Discord webhook function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const discordWebhookUrl = Deno.env.get("DISCORD_WEBHOOK_URL");
    
    if (!discordWebhookUrl) {
      console.error("Discord webhook URL not configured");
      return new Response(
        JSON.stringify({ 
          error: "Discord webhook not configured",
          success: false 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, business, message }: ContactFormData = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields",
          success: false 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Basic spam prevention - simple length checks
    if (name.length > 100 || email.length > 100 || message.length > 2000) {
      console.log("Blocked potential spam - content too long");
      return new Response(
        JSON.stringify({ 
          error: "Content too long",
          success: false 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create Discord embed
    const embed: DiscordEmbed = {
      title: "📩 New Contact Form Submission",
      description: "A new inquiry has been received from the website.",
      color: 0x3B82F6, // Blue color
      fields: [
        {
          name: "👤 Name",
          value: name,
          inline: true
        },
        {
          name: "📧 Email",
          value: email,
          inline: true
        },
        {
          name: "🏢 Business/Idea",
          value: business || "Not specified",
          inline: true
        },
        {
          name: "📝 Message",
          value: message.length > 1000 ? message.substring(0, 1000) + "..." : message,
          inline: false
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Buildnest Contact Form"
      }
    };

    const discordPayload = {
      embeds: [embed],
      username: "Buildnest Bot",
      avatar_url: "https://cdn.discordapp.com/attachments/your-avatar-url" // Optional: replace with your bot avatar
    };

    console.log("Sending to Discord webhook...");

    // Send to Discord
    const discordResponse = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordPayload),
    });

    if (!discordResponse.ok) {
      const errorText = await discordResponse.text();
      console.error("Discord webhook failed:", discordResponse.status, errorText);
      
      // Return success to user but log the error
      return new Response(
        JSON.stringify({ 
          success: true,
          message: "Message received (Discord notification may have failed)"
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Discord webhook sent successfully");

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Message sent successfully to Discord"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in Discord webhook function:", error);
    
    // Return a user-friendly error but don't expose internal details
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);