"use client";

import { CreditCard } from "lucide-react";

export default function CardInfo() {
  return (
    <section className="bg-gradient-to-r from-purple-dark to-purple-accent text-black rounded-2xl p-6 shadow-lg h-50 ">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm">My Card</span>
        <CreditCard className="w-6 h-6" />
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold tracking-wider">**** **** **** 1234</p>
        <p className="text-sm text-gray-200">09/27</p>
      </div>

      <div className="flex justify-between items-center text-sm">
        <span>Victor J.</span>
        <span className="uppercase">Mastercard</span>
      </div>
    </section>
  );
}
