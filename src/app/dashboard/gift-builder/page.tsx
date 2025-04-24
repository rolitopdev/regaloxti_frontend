"use client";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import GiftBuilder from "../../../components/GiftBuilder";

export default function GiftBuilderPage() {

    useAuthGuard();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Armar mi regalo</h1>
            <GiftBuilder />
        </div>
    );
}
