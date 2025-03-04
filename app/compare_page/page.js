import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Compare() {
  const router = useRouter();

  const [carData, setCarData] = useState([]);
  const [brands1, setBrands1] = useState([]);
  const [models1, setModels1] = useState([]);
  const [brands2, setBrands2] = useState([]);
  const [models2, setModels2] = useState([]);
  const [selectedBrand1, setSelectedBrand1] = useState("");
  const [selectedModel1, setSelectedModel1] = useState("");
  const [selectedBrand2, setSelectedBrand2] = useState("");
  const [selectedModel2, setSelectedModel2] = useState("");

  // const { model1, model2 } = router.query;

  useEffect(() => {
    // Fetch car data
    fetch("http://localhost:8080/api/findall")
      .then((res) => res.json())
      .then((data) => {
        // ตรวจสอบว่า data เป็น array หรือไม่
        if (Array.isArray(data)) {
          setCarData(data);
          console.log("Fetched data:", data);

          // ดึงค่า unique ของ brand
          const uniqueBrands = [...new Set(data.map((car) => car.brand))];

          // แยกเป็น 2 กลุ่ม
          const midIndex = Math.ceil(uniqueBrands.length / 2);
          const uniqueBrands1 = uniqueBrands.slice(0, midIndex);
          const uniqueBrands2 = uniqueBrands.slice(midIndex);

          setBrands1(uniqueBrands1);
          setBrands2(uniqueBrands2);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (selectedBrand1) {
      const filteredModels = carData
        .filter((car) => car.brand === selectedBrand1)
        .map((car) => car.model);
      setModels1([...new Set(filteredModels)]);
    } else {
      setModels1([]);
    }
  }, [selectedBrand1, carData]);

  useEffect(() => {
    if (selectedBrand2) {
      const filteredModels = carData
        .filter((car) => car.brand === selectedBrand2)
        .map((car) => car.model);
      setModels2([...new Set(filteredModels)]);
    } else {
      setModels2([]);
    }
  }, [selectedBrand2, carData]);

  const handleBrandChange1 = (event) => {
    setSelectedBrand1(event.target.value);
    setSelectedModel1("");
  };

  const handleModelChange1 = (event) => {
    setSelectedModel1(event.target.value);
  };

  const handleBrandChange2 = (event) => {
    setSelectedBrand2(event.target.value);
    setSelectedModel2("");
  };

  const handleModelChange2 = (event) => {
    setSelectedModel2(event.target.value);
  };

  const isBothSelected =
    selectedBrand1 && selectedModel1 && selectedBrand2 && selectedModel2;

  const getComparisonClass = (value1, value2) => {
    if (value1 > value2) {
      return "text-green-500 font-semibold"; 
    } else if (value1 < value2) {
      return "text-red-500 font-semibold"; 
    } else {
      return "text-gray-600"; 
    }
  };

  return (
    <div
      className="bg-white w-full flex flex-col items-center text-center font-prompt p-16"
      id="section-compare"
    >
      <div className="font-prompt">
        <h5 className="text-2xl font-bold text-black mb-12">
          เปรียบเทียบรถยนต์ไฟฟ้า
        </h5>
      </div>
      <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="flex flex-col w-full text-gray-600 justify-center items-center">
          <p className="font-prompt text-lg text-gray-800 m-2 mt-6">
            เลือก รถยนต์ไฟฟ้าคันที่ 1
          </p>
          <select
            id="brand-select"
            value={selectedBrand1}
            onChange={handleBrandChange1}
            className="border rounded-md p-3 w-3/4 h-12 my-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Brand</option>
            {brands1.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          <select
            id="model-select"
            value={selectedModel1}
            onChange={handleModelChange1}
            disabled={!selectedBrand1}
            className="border rounded-md p-3 w-3/4 h-12 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Model</option>
            {models1.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-full text-gray-600 justify-center items-center">
          <p className="font-prompt text-lg text-gray-800 mt-6">
            เลือก รถยนต์ไฟฟ้าคันที่ 2
          </p>
          <select
            id="brand-select"
            value={selectedBrand2}
            onChange={handleBrandChange2}
            className="border rounded-md p-3 w-3/4 h-12 my-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Brand</option>
            {brands2.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          <select
            id="model-select"
            value={selectedModel2}
            onChange={handleModelChange2}
            disabled={!selectedBrand2}
            className="border rounded-md p-3 w-3/4 h-12 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Model</option>
            {models2.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 w-full max-w-4xl place-items-center mt-12">
        {isBothSelected && (
          <div className="grid grid-cols-2 gap-6 w-full">
            {/* First Car */}
            <div className="w-full bg-white rounded-lg shadow-lg p-6 border border-gray-300 hover:shadow-2xl transition-shadow duration-300">
              {carData
                .filter(
                  (car) =>
                    car.brand === selectedBrand1 && car.model === selectedModel1
                )
                .map((car) => (
                  <div key={car.id}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {car.model}
                    </h3>
                    <div className="mb-4 flex justify-between">
                      <span className="font-medium text-lg text-gray-800">
                        Battery:
                      </span>
                      <span
                        className={getComparisonClass(
                          car.battery,
                          carData.find(
                            (car2) =>
                              car2.brand === selectedBrand2 &&
                              car2.model === selectedModel2
                          )?.battery || 0
                        )}
                      >
                        {car.battery}
                      </span>
                    </div>
                    <div className="mb-4 flex justify-between">
                      <span className="font-medium text-lg text-gray-800">
                        Top Speed:
                      </span>
                      <span
                        className={getComparisonClass(
                          car.top_Speed,
                          carData.find(
                            (car2) =>
                              car2.brand === selectedBrand2 &&
                              car2.model === selectedModel2
                          )?.top_Speed || 0
                        )}
                      >
                        {car.top_Speed}
                      </span>
                    </div>
                    <div className="mb-4 flex justify-between">
                      <span className="font-medium text-lg text-gray-800">
                        Range (km):
                      </span>
                      <span
                        className={getComparisonClass(
                          car.real_range,
                          carData.find(
                            (car2) =>
                              car2.brand === selectedBrand2 &&
                              car2.model === selectedModel2
                          )?.real_range || 0
                        )}
                      >
                        {car.real_range}
                      </span>
                    </div>
                    <div className="mb-4 flex justify-between">
                      <span className="font-medium text-lg text-gray-800">
                        Efficiency:
                      </span>
                      <span
                        className={getComparisonClass(
                          car.efficiency,
                          carData.find(
                            (car2) =>
                              car2.brand === selectedBrand2 &&
                              car2.model === selectedModel2
                          )?.efficiency || 0
                        )}
                      >
                        {car.efficiency}
                      </span>
                    </div>
                    <div className="mb-4 flex justify-between">
                      <span className="font-medium text-lg text-gray-800">
                        Fast Charge:
                      </span>
                      <span
                        className={getComparisonClass(
                          car.fastcharge,
                          carData.find(
                            (car2) =>
                              car2.brand === selectedBrand2 &&
                              car2.model === selectedModel2
                          )?.fastcharge || 0
                        )}
                      >
                        {car.fastcharge}
                      </span>
                    </div>
                    <hr className="border-gray-300 my-4" />
                    <div className="mb-4 flex justify-between">
                      <span className="font-medium text-lg text-gray-800">
                        Drive Configuration:
                      </span>
                      <span className="text-gray-800">
                        {car.drive_Configuration}
                      </span>
                    </div>
                    <div className="mb-4 flex justify-between">
                      <span className="font-medium text-lg text-gray-800">
                        Tow Hitch:
                      </span>
                      <span className="text-gray-800">{car.tow_Hitch}</span>
                    </div>
                    <div className="mb-4 flex justify-between">
                      <span className="font-medium text-lg text-gray-800">
                        Number of Seats:
                      </span>
                      <span className="text-gray-800">
                        {car.number_of_seats}
                      </span>
                    </div>{" "}
                  </div>
                ))}
            </div>

            {/* Second Car */}
            <div className="w-full bg-white rounded-lg shadow-lg p-6 border border-gray-300 hover:shadow-2xl transition-shadow duration-300">
              {carData
                .filter(
                  (car) =>
                    car.brand === selectedBrand2 && car.model === selectedModel2
                )
                .map((car) => (
                  <div key={car.id}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {car.model}
                    </h3>
                    <div className="mb-4 flex justify-between">
                      <span className="font-medium text-lg text-gray-800">
                        Battery:
                      </span>
                      <span
                        className={getComparisonClass(
                          car.battery,
                          carData.find(
                            (car2) =>
                              car2.brand === selectedBrand1 &&
                              car2.model === selectedModel1
                          )?.battery || 0
                        )}
                      >
                        {car.battery}
                      </span>
                    </div>
                    <div className="mb-4 flex justify-between">
                      <span className="font-medium text-lg text-gray-800">
                        Top Speed:
                      </span>
                      <span
                        className={getComparisonClass(
                          car.top_Speed,
                          carData.find(
                            (car2) =>
                              car2.brand === selectedBrand1 &&
                              car2.model === selectedModel1
                          )?.top_Speed || 0
                        )}
                      >
                        {car.top_Speed}
                      </span>
                    </div>
                    <div className="mb-4 flex justify-between">
                      <span className="font-medium text-lg text-gray-800">
                        Range (km):
                      </span>
                      <span
                        className={getComparisonClass(
                          car.real_range,
                          carData.find(
                            (car2) =>
                              car2.brand === selectedBrand1 &&
                              car2.model === selectedModel1
                          )?.real_range || 0
                        )}
                      >
                        {car.real_range}
                      </span>
                    </div>
                    <div className="mb-4 flex justify-between">
                      <span className="font-medium text-lg text-gray-800">
                        Efficiency:
                      </span>
                      <span
                        className={getComparisonClass(
                          car.efficiency,
                          carData.find(
                            (car2) =>
                              car2.brand === selectedBrand1 &&
                              car2.model === selectedModel1
                          )?.efficiency || 0
                        )}
                      >
                        {car.efficiency}
                      </span>
                    </div>
                    <div className="mb-4 flex justify-between">
                      <span className="font-medium text-lg text-gray-800">
                        Fast Charge:
                      </span>
                      <span
                        className={getComparisonClass(
                          car.fastcharge,
                          carData.find(
                            (car2) =>
                              car2.brand === selectedBrand1 &&
                              car2.model === selectedModel1
                          )?.fastcharge || 0
                        )}
                      >
                        {car.fastcharge}
                      </span>
                    </div>
                    <div>
                      <hr className="border-gray-300 my-4" />
                      <div className="mb-4 flex justify-between">
                        <span className="font-medium text-lg text-gray-800">
                          Drive Configuration:
                        </span>
                        <span className="text-gray-800">
                          {car.drive_Configuration}
                        </span>
                      </div>
                      <div className="mb-4 flex justify-between">
                        <span className="font-medium text-lg text-gray-800">
                          Tow Hitch:
                        </span>
                        <span className="text-gray-800">{car.tow_Hitch}</span>
                      </div>
                      <div className="mb-4 flex justify-between">
                        <span className="font-medium text-lg text-gray-800">
                          Number of Seats:
                        </span>
                        <span className="text-gray-800">
                          {car.number_of_seats}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
