"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Proposal } from "@/models/proposal";

export default function ProposalPage() {
  const params = useSearchParams();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula uma chamada de API para buscar os dados do pedido
    fetch(`/api/proposals/${params.get("id")}`)
      .then((response) => response.json())
      .then((data) => {
        setProposal(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-10 w-10 text-gray-500" />
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Pedido não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-purple-300 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-6 shadow-2xl rounded-2xl bg-white">
        <CardContent className="space-y-6">
          <h1 className="text-3xl font-bold text-center text-pink-600">
            {proposal.relationshipType === "casamento"
              ? "Pedido de Casamento"
              : "Pedido de Namoro"}
          </h1>
          <p className="text-xl text-center text-gray-700">
            {proposal.senderName} tem algo especial para você,{" "}
            {proposal.receiverName}!
          </p>
          <div className="flex justify-center space-x-4">
            {proposal.photos?.map((photo, index) => (
              <Image
                key={index}
                src={photo}
                alt={`Foto ${index + 1}`}
                className="w-32 h-32 object-cover rounded-xl shadow-md"
              />
            ))}
          </div>
          <p className="text-lg text-center text-gray-600 italic">
            “{proposal.message}”
          </p>
          <div className="flex justify-center mt-6">
            <Button className="text-white bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-xl text-lg">
              {proposal.relationshipType === "casamento"
                ? "Diga SIM ao Casamento!"
                : "Aceitar Namoro!"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
