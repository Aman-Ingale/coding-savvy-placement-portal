"use client";

import { useEffect, useState } from "react";
import OpportunityCard from "@/components/OpportunityCard";
// import { opportunities } from "@/data/opportunities";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getAllOpportunities } from "../actions/opportunities.actions";

export default function OpportunitiesPage() {
  const [search, setSearch] = useState("");
  const [opportunities, setOpportunities] = useState([]);
  
  const filteredOpportunities = opportunities?.filter((item) =>
    `${item.role} ${item.company_name} ${item.tags?.join(" ")}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  useEffect(() => {
    async function getData() {
      const temp = await getAllOpportunities()
      setOpportunities(temp.data)
      console.log(temp.data)
    }
    getData()
  }, [])
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Explore Opportunities</h1>
          <p className="text-muted-foreground">
            Find jobs, internships, and career opportunities
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            placeholder="Search by role, company, or skill..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Opportunities Grid */}
        {filteredOpportunities.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredOpportunities?.map((opportunity,index) => (
              <OpportunityCard
                key={index}
                opportunity={opportunity}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No opportunities found.
          </p>
        )}
      </div>
    </div>
  );
}
