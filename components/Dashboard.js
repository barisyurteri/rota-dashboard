import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import haversine from "haversine-distance";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Dashboard() {
  const [activeWeek, setActiveWeek] = useState("week15");
  const [houseData, setHouseData] = useState({
    week15: [
      { id: 1, address: "WILLEM BONTEKESTRAAT 96, ALMERE,1335 NJ", assignedTo: "Sezer Ahmed", coordinates: { lat: 52.3731, lng: 5.2165 } },
      { id: 2, address: "WILLEM BONTEKESTRAAT 96, ALMERE,1335 NJ", assignedTo: "Metin Yozlem", coordinates: { lat: 52.3731, lng: 5.2165 } },
      { id: 3, address: "WILLEM BONTEKESTRAAT 96, ALMERE,1335 NJ", assignedTo: "Melisa Soydan", coordinates: { lat: 52.3731, lng: 5.2165 } },
      { id: 4, address: "WILLEM BONTEKESTRAAT 96, ALMERE,1335 NJ", assignedTo: "Cuneyt Sanli", coordinates: { lat: 52.3731, lng: 5.2165 } },
    ],
    week16: [],
    week17: []
  });

  const houses = houseData[activeWeek];

  const [factories, setFactories] = useState([
    { id: 1, name: "All Bakers", location: "Fort de Gagel 1, 1358 DC Almere", coordinates: { lat: 52.4026, lng: 5.2016 } },
    { id: 2, name: "Braas", location: "Braken 2, 1713 GC Obdam", coordinates: { lat: 52.7032, lng: 4.9046 } },
    { id: 3, name: "Goedhart Emmelord", location: "Nijverheidstraat 3, 8301 AD Emmeloord", coordinates: { lat: 52.7074, lng: 5.7517 } },
    { id: 4, name: "Borgesius Rotterdam", location: "Industrieweg 150, 3044 AT Rotterdam", coordinates: { lat: 51.9225, lng: 4.3891 } },
  ]);

  const [workers, setWorkers] = useState([
    { id: 1, name: "Sezer Ahmed", phone: "N/A", houseId: 1, factoryId: 1 },
    { id: 2, name: "Metin Yozlem", phone: "90 552 020 22 70", houseId: 2, factoryId: 2 },
    { id: 3, name: "Melisa Soydan", phone: "90 535 046 22 49", houseId: 3, factoryId: 3 },
    { id: 4, name: "Cuneyt Sanli", phone: "90 535 464 36 56", houseId: 4, factoryId: 4 },
  ]);

  const getHouseById = (id) => houses.find(h => h.id === id);
  const getFactoryById = (id) => factories.find(f => f.id === id);
  const calculateDistance = (from, to) => {
    if (!from || !to) return null;
    return (haversine(from, to) / 1000).toFixed(2);
  };

  const generateReport = () => {
    const report = workers.map(worker => {
      const house = getHouseById(worker.houseId);
      const factory = getFactoryById(worker.factoryId);
      const distance = calculateDistance(house?.coordinates, factory?.coordinates);
      return `${worker.name}: ${house?.address || "No House"} → ${factory?.name || "No Factory"} = ${distance || "N/A"} km`;
    });
    const blob = new Blob([report.join("\n")], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `rota_raporu_${activeWeek}.txt`;
    link.click();
  };

  const handleAssignmentChange = (workerId, houseId, factoryId) => {
    setWorkers(prev =>
      prev.map(w => w.id === workerId ? { ...w, houseId, factoryId } : w)
    );
  };

  return (
    <div className="p-4 space-y-4">
      <Tabs value={activeWeek} onValueChange={setActiveWeek} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="week15">Week 15</TabsTrigger>
          <TabsTrigger value="week16">Week 16</TabsTrigger>
          <TabsTrigger value="week17">Week 17</TabsTrigger>
        </TabsList>
        <TabsContent value={activeWeek}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardContent>
                <h2 className="text-xl font-bold mb-2">Houses for {activeWeek.toUpperCase()}</h2>
                {houses.map((house) => (
                  <div key={house.id} className="mb-1">
                    {house.address} - Assigned to: {house.assignedTo}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
