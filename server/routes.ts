import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  const wss = new WebSocketServer({ server: httpServer, path: "/ws" });

  const clients = new Set<WebSocket>();

  wss.on("connection", (ws: WebSocket) => {
    clients.add(ws);
    console.log("WebSocket client connected. Total clients:", clients.size);

    ws.on("message", (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        
        if (data.type === "mining_update") {
          clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: "mining_update",
                userId: data.userId,
                balance: data.balance,
              }));
            }
          });
        }

        if (data.type === "leaderboard_update") {
          clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: "leaderboard_update",
                timestamp: Date.now(),
              }));
            }
          });
        }
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    });

    ws.on("close", () => {
      clients.delete(ws);
      console.log("WebSocket client disconnected. Total clients:", clients.size);
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
      clients.delete(ws);
    });

    ws.send(JSON.stringify({ type: "connected", message: "Connected to PingCaset server" }));
  });

  return httpServer;
}
