"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CalculatePage() {
  const [selectedFormula, setSelectedFormula] = useState("null");
  const [inputMode, setInputMode] = useState("carModel");

  const [selectedBrand1, setSelectedBrand1] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedModel1, setSelectedModel1] = useState("");

  const [carData, setCarData] = useState([]);
  const [fuelTypeData, setFuelTypeData] = useState([]);
  const [selectedFuel, setSelectedFuel] = useState("");
  const [brands1, setBrands1] = useState([]);
  const [models1, setModels1] = useState([]);
  const [FuelCarData, setFuelCarData] = useState([]);

  const [brands2, setBrands2] = useState([]);
  const [models2, setModels2] = useState([]);
  const [selectedBrand2, setSelectedBrand2] = useState("");
  const [selectedModel2, setSelectedModel2] = useState("");

  const [electricityCost, setElectricityCost] = useState(0);
  const [powerConsumption, setPowerConsumption] = useState(0);
  const [batteryChargePercentage, setBatteryChargePercentage] = useState(0);
  const [batteryCapacity, setBatteryCapacity] = useState(0);
  const [chargingCost, setChargingCost] = useState(0);

  const [fuelConsumption, setFuelConsumption] = useState(0);
  const [distance, setDistance] = useState(0);
  const [fuelPrice, setFuelPrice] = useState(0);

  const [travelDistance, setTravelDistance] = useState(0);
  const [longTermCost, setLongTermCost] = useState(0);

  const [selectedYear, setSelectedYear] = useState(null);

  const options = { "≤ 5 ปี": 5, "6 ปี": 6, "7 ปี": 7, "8 ปี": 8 };
  const CarInsuranceOptions = {
    "ชั้น 1": 10000,
    "ชั้น 2+": 7500,
    "ชั้น 3": 2500,
  };
  const CarTypeOptions = {
    "Eco car": 1300,
    "City car": 1500,
    "Mid-Size Car": 1800,
    "Luxury Car": 2500,
  };
  const CarInsuranceOptionsEv = {
    "ชั้น 1": 28000,
    "ชั้น 2+": 7500,
    "ชั้น 3": 2500,
  };
  const CarTypeOptionsEv = {
    "Eco car": 1300,
    "City car": 1500,
    "Mid-Size Car": 1800,
    "Luxury Car": 2500,
  };
  const [distanceCompare, setDistanceCompare] = useState(0);

  const [selectedCarInsurance, setSelectedCarInsurance] = useState(null);
  const [selectedCarTypeOptions, setSelectedCarTypeOptions] = useState(null);
  const selectedCC = CarTypeOptions[selectedCarTypeOptions];
  const selectedCinsurance = CarInsuranceOptions[selectedCarInsurance];

  const calculateElectricityUsed = () => {
    if (travelDistance > 0 && powerConsumption > 0 && electricityCost > 0) {
      const electricityUsed = (travelDistance * powerConsumption) / 100;
      const electricCost = electricityUsed * electricityCost;
      return electricCost;
    }
    console.warn("Invalid input for electricity calculation");
    return 0;
  };
  const calculateElectricCost = () => {
    const calculatedElectricCost =
      powerConsumption > 0 && electricityCost > 0
        ? (distance / 100) * powerConsumption * electricityCost
        : 0;

    console.log(calculatedElectricCost);
    return calculatedElectricCost;
  };

  const calculateFuelCost = () => {
    const calculatedFuelLiter =
      fuelConsumption !== 0 ? distance / fuelConsumption : 0;
    const calculatedFuelCost = calculatedFuelLiter * fuelPrice;
    console.log(calculatedFuelCost);
    console.log("fuelConsumption" + fuelConsumption + "distance" + distance);
    return calculatedFuelCost;
  };
  const calculateCarTax = (cc) => {
    let tax = 0;

    if (cc <= 600) {
      tax = cc * 0.5;
    } else if (cc <= 1800) {
      tax = 600 * 0.5 + (cc - 600) * 1.5;
    } else {
      tax = 600 * 0.5 + 1200 * 1.5 + (cc - 1800) * 4;
    }

    return tax;
  };

  const calculateLongTermCost = () => {
    // คำนวณค่าน้ำมัน
    const fuelCost = (distanceCompare / fuelConsumption) * fuelPrice;

    const totalFuelCost = fuelCost * 365 * selectedYear;

    // หาค่า cc ของรถที่เลือก
    const selectedCC = CarTypeOptions[selectedCarTypeOptions];

    // คำนวณภาษีรถยนต์ต่อปี
    const carTaxPerYear = calculateCarTax(selectedCC);
    const carInsurance = CarInsuranceOptions[selectedCarInsurance];
    // คำนวณค่าใช้จ่ายรวม
    const totalCost =
      totalFuelCost + carTaxPerYear * selectedYear + carInsurance;

    return totalCost;
  };

  const totalCost = calculateLongTermCost();
  console.log(
    `ค่าใช้จ่ายทั้งหมดที่ต้องจ่าย: ${totalCost.toLocaleString()} บาท`
  );

  const handleBrandChange2 = (event) => {
    setSelectedBrand2(event.target.value);
    setSelectedModel2("");
  };

  const handleModelChange2 = (event) => {
    setSelectedModel2(event.target.value);
  };
  useEffect(() => {
    fetch("http://localhost:8080/api/findall")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCarData(data);
          console.log("Fetched data:", data);

          const uniqueBrands1 = [...new Set(data.map((car) => car.brand))];
          setBrands1(uniqueBrands1);
        }
      })
      .catch((error) => console.error("Error fetching car data:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/allfueltype")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched fuelTypeData:", data);
        if (Array.isArray(data)) {
          setFuelTypeData(data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/fuelcarData")
      .then((res) => res.json())
      .then((fuelCar) => {
        if (Array.isArray(fuelCar)) {
          setFuelCarData(fuelCar);
          console.log("Fetched fuel car data:", fuelCar);

          const uniqueBrands2 = [...new Set(fuelCar.map((car) => car.brand))];
          setBrands2(uniqueBrands2);
        }
      })
      .catch((error) => console.error("Error fetching fuel car data:", error));
  }, []);

  const handleModelChange1 = (event) => {
    setSelectedModel1(event.target.value);
  };
  useEffect(() => {
    const cost = calculateChargingCost();
    setChargingCost(cost);
  }, [batteryCapacity, batteryChargePercentage, electricityCost]);

  useEffect(() => {
    if (selectedModel1) {
      const selectedCar = carData.find((car) => car.model === selectedModel1);
      if (selectedCar) {
        setBatteryCapacity(selectedCar.battery || 0);
      }
    }
  }, [selectedModel1, carData]);

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
      const filteredModels = FuelCarData.filter(
        (car) => car.brand === selectedBrand2
      ).map((car) => car.model);
      setModels2([...new Set(filteredModels)]);
    } else {
      setModels2([]);
    }
  }, [selectedBrand2, FuelCarData]);

  useEffect(() => {
    if (selectedModel1) {
      const selectedCar = carData.find((car) => car.model === selectedModel1);
      if (selectedCar) {
        setBatteryCapacity(selectedCar.battery || 0);
        const efficiency =
          selectedCar.efficiency || selectedCar.PowerConsumption || 0;
        setPowerConsumption(efficiency / 10);
      }
    }
  }, [selectedModel1]);
  useEffect(() => {
    if (selectedModel2) {
      const selectedCar = FuelCarData.find(
        (car) => car.model === selectedModel2
      );
      if (selectedCar) {
        const fuelEconomy = selectedCar.fuelEconomy * 0.425144 || 0;
        console.log(selectedCar.fuelEconomy);
        setFuelConsumption(fuelEconomy);
      }
    }
  }, [selectedModel2, FuelCarData]);
  const calculateChargingCost = () => {
    if (
      batteryCapacity > 0 &&
      batteryChargePercentage > 0 &&
      electricityCost > 0
    ) {
      const batteryCharge = (batteryChargePercentage / 100) * batteryCapacity;
      const cost = batteryCharge * electricityCost;
      return cost;
    }
    return 0;
  };
  useEffect(() => {
    console.log("carData updated:", carData);
    console.log("uniqueBrands1:", brands1);
    console.log("uniqueBrands2:", brands2);
    console.log("moedl2:", models2);
    console.log("powerconsumption:", powerConsumption);
  }, [carData]);

  const resetManualInputs = () => {
    setSelectedBrand1("");
    setBatteryCapacity(0);
    setPowerConsumption(0);
    setElectricityCost(0);
    setBatteryChargePercentage(0);
    setInputMode("carModel");
  };

  const resetManualInputsForManual = () => {
    setSelectedBrand1("");
    setBatteryCapacity(0);
    setPowerConsumption(0);
    setElectricityCost(0);
    setBatteryChargePercentage(0);
    setTravelDistance(0);
    setSelectedBrand2("");
    setFuelConsumption();
  };
  const closeModal = () => {
    setSelectedFormula(null);
    resetManualInputs();
  };
  const handleInputModeChange = (mode) => {
    setInputMode(mode);
  };
  const handleBrandChange1 = (event) => {
    setSelectedBrand1(event.target.value);
    setSelectedModel1("");
  };
  return (
    <div className="font-prompt bg-white h-screen w-full  top-0 left-0 fixed">
      <div>
        <h1 className="text-center text-2xl mt-24 text-mainblue font-bold">
          สูตรคำนวณที่เกี่ยวข้องกับรถยนต์ไฟฟ้า
        </h1>
      </div>
      <div className="grid grid-cols-2 text-gray-400 align-middle mt-6">
        <div className="flex justify-end">
          <div
            className="bg-white border shadow-lg m-2 rounded-2xl w-3/4 p-12
         text-center align-middle"
            onClick={() => setSelectedFormula("cargingCostByPercent")}
          >
            <p className="text-lg font-semibold text-mainblue mb-4 text-center">
              การคำนวณค่าชาร์จไฟฟ้า <br /> ตามเปอร์เซ็นต์ (%) ที่ชาร์จไป
            </p>
            <p className="text-gray-500 mt-2">
              ค่าใช้จ่ายในการชาร์จรถยนต์ไฟฟ้าตามเปอร์เซนต์ที่ชาร์จไป
            </p>{" "}
          </div>
        </div>
        <div className="flex justify-start">
          <div
            className="transition-transform duration-300 hover:scale-110 hover:text-gray-500 bg-white border shadow-lg m-2 rounded-2xl w-3/4 p-12 text-center"
            onClick={() => setSelectedFormula("cargingCostByDistance")}
          >
            <p className="text-lg font-semibold text-mainblue mb-4 text-center">
              การคำนวณค่าไฟฟ้า
              <br />
              ตามระยะทางในการเดินทาง
            </p>
            <p className="text-gray-500 mt-2">
              การคำนวณค่าใช้จ่ายในการชาร์จรถยนต์ไฟฟ้าตามระยะทาง
            </p>{" "}
          </div>
        </div>
        <div className="flex justify-end flex-wrap">
          <div
            className="bg-white border shadow-lg m-2 rounded-2xl w-3/4 p-12
         text-center align-middle"
            onClick={() => setSelectedFormula("compare")}
          >
            <p className="text-lg font-semibold text-mainblue mb-4 text-center">
              สูตรเปรียบเทียบค่าใช้จ่ายในการเดินทาง
              <br />
              ด้วยรถยนต์ไฟฟ้าและรถยนต์น้ำมัน
            </p>
            <p className="text-gray-500 mt-2 ">
              ความคุ้มค่าในการเดินทางด้วยรถยนต์ไฟฟ้าและรถยนต์น้ำมัน
              <br />
              *ความแตกต่างอาจจะขึ้นอยู่กับ ความเร็วในการขับขี่ สภาพถนน
              <br />
              การคำนวณนี้เป็นค่าประมาณเท่านั้น
            </p>{" "}
          </div>
        </div>
        <div className="flex justify-start">
          <div
            className="transition-transform duration-300 hover:scale-110 hover:text-gray-500 bg-white border shadow-lg m-2 rounded-2xl w-3/4 p-12 text-center"
            onClick={() => setSelectedFormula("MaintenanceCostComparison")}
          >
            <p className="text-lg font-semibold text-mainblue mb-4 text-center">
              การคำนวณค่าใช้จ่ายในการบำรุงรักษา
              <br />
              เปรียบเทียบระหว่างรถยนต์น้ำมันและรถยนต์ไฟฟ้า
            </p>
            <p className="text-gray-500 mt-2">
              การคำนวณค่าใช้จ่ายในการบำรุงรักษาเปรียบเทียบระหว่างรถยนต์น้ำมันและรถยนต์ไฟฟ้าโดยประมาณค่าจากค่า้จ่ายต่าง
              ๆ เช่น ค่าภาษีประจำปี, ค่าบำรุงรักษา, ค่าใช้จ่ายเชื้อเพลิง/พลังงาน
              และค่าใช้จ่ายแฝงอื่น ๆ ต่อปี
            </p>{" "}
          </div>
        </div>
      </div>
      {selectedFormula === "MaintenanceCostComparison" && (
        <div className="z-30 fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center font-prompt">
          <div
            className="bg-white px-7 py-6 rounded-lg shadow-lg w-full mx-4 overflow-y-auto"
            style={{ maxHeight: "90vh" }}
          >
            {" "}
            <h6 className="text-xl font-semibold text-mainblue  text-center">
              สูตรการคำนวณค่าไฟฟ้าสำหรับการเดินทาง
            </h6>
            {/* <p className="text-center text-gray-400 mb-4">
              *ค่าคำนวณนี้เป็นการประมาณการ
              กรุณาตรวจสอบข้อมูลเพิ่มเติมเพื่อความแม่นยำ
              ค่าบำรุงรักษารถยนต์น้ำมัน ประมาณ15,000
            </p> */}
            <div className="grid grid-cols-2 gap-4 border rounded p-3 mb-2">
              <div>
                <p className="text-gray-600 font-bold">ระยะเวลาในการใช้รถ</p>
                {Object.entries(options).map(([option, year], index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedYear(year)}
                    className={`px-2 my-4 rounded-lg mx-2 transition-colors duration-300 ${
                      selectedYear === year
                        ? "bg-white text-mainblue border border-mainblue"
                        : "bg-mainblue text-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div>
                <label
                  htmlFor="distance"
                  className="block text-gray-600 font-bold"
                >
                  ระยะทางที่ขับโดยเฉลี่ยต่อวัน
                </label>
                <input
                  id="distance"
                  type="number"
                  className="border px-2 py-1 rounded w-full mt-2"
                  value={distanceCompare}
                  onChange={(e) => setDistanceCompare(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-gray-600">
              <div className="">
                <p className="font-bold">รถยนต์น้ำมัน</p>
                <div className="grid grid-cols-2">
                  <div className="mx-2">
                    <label className="block text-gray-600">เลือกยี่ห้อรถ</label>

                    <select
                      id="brand-select"
                      value={selectedBrand2}
                      onChange={handleBrandChange2}
                      className="border rounded-md p-2 w-full h-10 my-2 text-black"
                    >
                      <option value="">เลือกยี่ห้อรถ</option>
                      {brands2.length > 0 ? (
                        brands2.map((brand, index) => (
                          <option key={`brand-${index}`} value={brand}>
                            {brand}
                          </option>
                        ))
                      ) : (
                        <option value="">ไม่มีข้อมูล</option>
                      )}
                    </select>
                  </div>
                  <div className="mx-2">
                    <label className="block text-gray-600">เลือกรุ่นรถ</label>
                    <select
                      id="model-select"
                      value={selectedModel2}
                      onChange={handleModelChange2}
                      disabled={!selectedBrand2}
                      className="border rounded-md p-2 w-full h-10 my-2 text-black"
                    >
                      <option value="">เลือกรุ่นรถ</option>
                      {models2.map((model, index) => (
                        <option key={`model-${index}`} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <label className="block text-gray-600 my-2">
                  ราคาน้ำมันต่อลิตร
                </label>
                <select
                  value={fuelPrice}
                  onChange={(e) => {
                    console.log("Selected fuel price:", e.target.value);
                    setFuelPrice(Number(e.target.value));
                  }}
                  className="border p-2 rounded-md w-full"
                >
                  <option value="">เลือกประเภทเชื้อเพลิง</option>
                  {fuelTypeData.map((fuel) => (
                    <option key={fuel.id} value={fuel.price}>
                      {fuel.fuelType} - {fuel.price} บาท/ลิตร
                    </option>
                  ))}
                </select>
                <p className="my-2">ประเภทประกัน</p>
                {Object.entries(CarInsuranceOptions).map(
                  ([option, price], index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCarInsurance(option)}
                      className={`px-2 rounded-lg mx-2 transition-colors duration-300  ${
                        selectedCarInsurance === option
                          ? "bg-white text-mainblue border border-mainblue"
                          : "bg-mainblue text-white"
                      }`}
                    >
                      {option} {price.toLocaleString()}
                    </button>
                  )
                )}
                <p className="my-2">ประเภทรถยนต์</p>
                {Object.entries(CarTypeOptions).map(([option, cc], index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCarTypeOptions(option)}
                    className={`px-2 rounded-lg mx-2 transition-colors duration-300 ${
                      selectedCarTypeOptions === option
                        ? "bg-white text-mainblue border border-mainblue"
                        : "bg-mainblue text-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div>
                <div className="font-bold">
                  <p>รถยนต์ไฟฟ้า</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-gray-600">
                  <div className="mx-2">
                    <label className="block text-gray-600">เลือกยี่ห้อรถ</label>
                    <select
                      id="brand-select"
                      value={selectedBrand1}
                      onChange={handleBrandChange1}
                      className="border rounded-md p-2 w-full h-10 my-2 text-black"
                    >
                      <option value="">เลือกยี่ห้อรถ</option>
                      {brands1.length > 0 ? (
                        brands1.map((brand, index) => (
                          <option key={`brand-${index}`} value={brand}>
                            {brand}
                          </option>
                        ))
                      ) : (
                        <option value="">ไม่มีข้อมูล</option>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-600">เลือกรุ่นรถ</label>
                    <select
                      id="model-select"
                      value={selectedModel1}
                      onChange={handleModelChange1}
                      disabled={!selectedBrand1}
                      className="border rounded-md p-2 w-full h-10 my-2 text-black"
                    >
                      <option value="">เลือกรุ่นรถ</option>
                      {models1.map((model, index) => (
                        <option key={`model-${index}`} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-2 mx-2">
                  <label className="block text-gray-600 my-2">
                    ค่าไฟต่อหน่วย (บาท/kWh)
                  </label>
                  <input
                    type="number"
                    value={electricityCost}
                    onChange={(e) => setElectricityCost(Number(e.target.value))}
                    className="p-2 w-full border border-gray-300 rounded text-black"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-3">
              <div className="flex justify-center">
                <div className="mt-2 border border-gray-300 rounded-lg p-2 w-1/2 bg-mainblue text-center shadow-md">
                  <h6 className="text-base text-white mb-2 font-prompt">
                    ค่าใช้จ่ายรถยนต์น้ำมัน
                    <p className="text-lg text-mainblue bg-white rounded-lg">
                      {totalCost} บาท
                    </p>
                  </h6>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="mt-2 border border-gray-300 rounded-lg p-2 w-1/2 bg-mainblue text-center shadow-md">
                  <h6 className="text-base text-white mb-2 font-prompt">
                    ค่าใช้จ่ายรถยนต์ไฟฟ้า
                    <p className="text-lg text-mainblue bg-white rounded-lg">
                      {calculateFuelCost().toFixed(2)} บาท
                    </p>
                  </h6>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="text-white bg-mainred hover:bg-red-600 px-4 py-2 rounded"
                onClick={closeModal}
              >
                ปิด
              </button>
            </div>{" "}
          </div>
        </div>
      )}
      {selectedFormula === "cargingCostByPercent" ? (
        <div>
          {" "}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center font-prompt">
            <div
              className="bg-white px-7 py-4 rounded-lg shadow-lg max-w-4xl w-11/12"
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <h6 className="text-xl font-semibold text-mainblue mb-4 text-center">
                สูตรการคำนวณค่าไฟฟ้าสำหรับการเดินทาง
              </h6>
              {/* ปุ่มสลับสำหรับเลือกระหว่าง "เลือกรุ่นรถ" กับ "พิมพ์ข้อมูลด้วยตนเอง" */}
              <div className="flex items-center justify-center mb-6">
                <button
                  className={`px-4 py-2 rounded-l ${
                    inputMode === "carModel"
                      ? "bg-mainblue text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                  onClick={() => {
                    setInputMode("carModel");
                    handleInputModeChange("carModel");
                    resetManualInputs();
                  }}
                >
                  เลือกยี่ห้อรถ
                </button>
                <button
                  className={`px-4 py-2 rounded-r ${
                    inputMode === "manual"
                      ? "bg-mainblue text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                  onClick={() => {
                    setInputMode("manual");
                    handleInputModeChange("manual");
                    resetManualInputsForManual();
                  }}
                >
                  พิมพ์ข้อมูลด้วยตนเอง
                </button>
              </div>

              {/* Layout แบบ 2 คอลัมน์ */}
              <div className="grid grid-cols-2 gap-6">
                {/* คอลัมน์ซ้าย: เลือกรถ */}
                <div className="pr-4">
                  {inputMode === "carModel" ? (
                    <div>
                      {/* ส่วน UI สำหรับเลือกรุ่นรถ */}
                      <label className="block text-gray-600">
                        เลือกยี่ห้อรถ
                      </label>
                      <select
                        id="brand-select"
                        value={selectedBrand1}
                        onChange={handleBrandChange1}
                        className="border rounded-md p-2 w-full h-10 my-4 text-black"
                      >
                        <option value="">เลือกยี่ห้อรถ</option>
                        {brands1.length > 0 ? (
                          brands1.map((brand, index) => (
                            <option key={`brand-${index}`} value={brand}>
                              {brand}
                            </option>
                          ))
                        ) : (
                          <option value="">ไม่มีข้อมูล</option>
                        )}
                      </select>

                      <label className="block text-gray-600">เลือกรุ่นรถ</label>
                      <select
                        id="model-select"
                        value={selectedModel1}
                        onChange={handleModelChange1}
                        disabled={!selectedBrand1}
                        className="border rounded-md p-2 w-full h-10 text-black"
                      >
                        <option value="">เลือกรุ่นรถ</option>
                        {models1.map((model, index) => (
                          <option key={`model-${index}`} value={model}>
                            {model}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      {/* ระบุข้อมูลด้วยตนเอง */}
                      <div>
                        <label className="block text-gray-600">
                          ความจุของbattery
                        </label>
                        <input
                          type="number"
                          value={batteryCapacity}
                          onChange={(e) =>
                            setBatteryCapacity(Number(e.target.value))
                          }
                          className="mt-2 p-2 w-full border rounded text-black"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* คอลัมน์ขวา: ข้อมูลการคำนวณ */}
                <div>
                  <div>
                    <label className="block text-gray-600">
                      เปอร์เซ็นต์แบตเตอรี่ที่ชาร์จ (%)
                    </label>
                    <input
                      type="number"
                      value={batteryChargePercentage}
                      onChange={(e) =>
                        setBatteryChargePercentage(Number(e.target.value))
                      }
                      className="mt-2 p-2 w-full border border-gray-300 rounded text-black"
                    />
                  </div>
                  <div className="my-4">
                    <label className="block text-gray-600">
                      อัตราสิ้นเปลืองไฟฟ้า (kWh/100 km)
                    </label>
                    <input
                      type="number"
                      value={powerConsumption}
                      onChange={(e) =>
                        setPowerConsumption(Number(e.target.value))
                      }
                      className="mt-2 p-2 w-full border border-gray-300 rounded text-black"
                    />
                  </div>
                  <div className="my-4">
                    <label className="block text-gray-600">
                      ค่าไฟต่อหน่วย (บาท/kWh)
                    </label>
                    <input
                      type="number"
                      value={electricityCost}
                      onChange={(e) =>
                        setElectricityCost(Number(e.target.value))
                      }
                      className="mt-2 p-2 w-full border border-gray-300 rounded text-black"
                    />
                  </div>
                </div>
              </div>

              {/* ผลการคำนวณ */}
              {/* <p className="mt-6 font-semibold text-gray-800">
              ค่าไฟที่ใช้ในการเดินทาง: {calculateChargingCost().toFixed(2)} บาท
            </p> */}
              <div className="mt-5 flex items-center justify-center">
                <div className="border border-gray-300 rounded-lg p-2 w-1/2 bg-mainblue text-center shadow-md">
                  <h6 className="text-base text-white mb-2 font-prompt">
                    ค่าชาร์จรถยนต์ไฟฟ้า
                  </h6>
                  <p className="text-lg text-mainblue bg-white p-2 rounded-lg">
                    {calculateChargingCost().toFixed(2)} บาท
                  </p>
                </div>
              </div>

              {/* ปุ่มปิด */}
              <div className="flex justify-center mt-6">
                <button
                  className="text-white bg-mainred hover:bg-red-600 px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {selectedFormula === "cargingCostByDistance" ? (
        <div>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center font-prompt">
            <div
              className="bg-white px-6 py-6 rounded-lg shadow-lg max-w-4xl w-11/12"
              style={{
                maxHeight: "90vh",
                overflowY: "auto",
                minHeight: "500px",
              }}
            >
              <h6 className="text-xl font-semibold text-mainblue mb-4 text-center">
                สูตรการคำนวณค่าไฟตามระยะทาง
              </h6>

              <div className="flex items-center justify-center mb-6">
                <button
                  className={`px-4 py-2 rounded-l ${
                    inputMode === "carModel"
                      ? "bg-mainblue text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                  onClick={() => {
                    setInputMode("carModel");
                    handleInputModeChange("carModel");
                    resetManualInputs();
                  }}
                >
                  เลือกยี่ห้อรถ
                </button>
                <button
                  className={`px-4 py-2 rounded-r ${
                    inputMode === "manual"
                      ? "bg-mainblue text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                  onClick={() => {
                    setInputMode("manual");
                    handleInputModeChange("manual");
                    resetManualInputsForManual();
                  }}
                >
                  พิมพ์ข้อมูลด้วยตนเอง
                </button>
              </div>

              <div className="pr-4">
                {inputMode === "carModel" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600">
                        ระยะทาง (กิโลเมตร)
                      </label>
                      <input
                        type="number"
                        value={travelDistance}
                        onChange={(e) =>
                          setTravelDistance(Number(e.target.value))
                        }
                        className="mt-1 p-2 w-full border border-gray-300 rounded text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600">
                        อัตราสิ้นเปลืองไฟฟ้า (kWh/100 km)
                      </label>
                      <input
                        type="number"
                        value={powerConsumption}
                        onChange={(e) =>
                          setPowerConsumption(Number(e.target.value))
                        }
                        className="mt-1 p-2 w-full border border-gray-300 rounded text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600">
                        เลือกยี่ห้อรถ
                      </label>
                      <select
                        id="brand-select"
                        value={selectedBrand1}
                        onChange={handleBrandChange1}
                        className="mt-1 border rounded-md p-2 w-full h-10 text-black"
                      >
                        <option value="">เลือกยี่ห้อรถ</option>
                        {brands1.length > 0 ? (
                          brands1.map((brand, index) => (
                            <option key={`brand-${index}`} value={brand}>
                              {brand}
                            </option>
                          ))
                        ) : (
                          <option value="">ไม่มีข้อมูล</option>
                        )}
                      </select>

                      <label className="mt-2 block text-gray-600">
                        เลือกรุ่นรถ
                      </label>
                      <select
                        id="model-select"
                        value={selectedModel1}
                        onChange={handleModelChange1}
                        disabled={!selectedBrand1}
                        className="mt-1 border rounded-md p-2 w-full h-10 text-black"
                      >
                        <option value="">เลือกรุ่นรถ</option>
                        {models1.map((model, index) => (
                          <option key={`model-${index}`} value={model}>
                            {model}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-600">
                        ค่าไฟฟ้าต่อหน่วย (บาท/kWh)
                      </label>
                      <input
                        type="number"
                        value={electricityCost}
                        onChange={(e) =>
                          setElectricityCost(Number(e.target.value))
                        }
                        className="mt-1 p-2 w-full border border-gray-300 rounded text-black"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-gray-600">
                        ระยะทาง (กิโลเมตร)
                      </label>
                      <input
                        type="number"
                        value={travelDistance}
                        onChange={(e) =>
                          setTravelDistance(Number(e.target.value))
                        }
                        className="mt-1 p-2 w-full border border-gray-300 rounded text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600">
                        อัตราสิ้นเปลืองไฟฟ้า (kWh/100 km)
                      </label>
                      <input
                        type="number"
                        value={powerConsumption}
                        onChange={(e) =>
                          setPowerConsumption(Number(e.target.value))
                        }
                        className="mt-1 p-2 w-full border border-gray-300 rounded text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600">
                        ค่าไฟฟ้าต่อหน่วย (บาท/kWh)
                      </label>
                      <input
                        type="number"
                        value={electricityCost}
                        onChange={(e) =>
                          setElectricityCost(Number(e.target.value))
                        }
                        className="mt-1 p-2 w-full border border-gray-300 rounded text-black"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center mt-6">
                <div className="border border-gray-300 rounded-lg p-2 w-1/2 bg-mainblue text-center shadow-md">
                  <h6 className="text-base text-white mb-2 font-prompt">
                    ค่าชาร์จรถยนต์ไฟฟ้า
                  </h6>
                  <p className="text-lg text-mainblue bg-white p-2 rounded-lg">
                    {calculateElectricityUsed().toFixed(2)} บาท
                  </p>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  className="text-white bg-red-500 hover:bg-mainred px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {selectedFormula === "compare" ? (
        <div>
          <div className="z-30 fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center font-prompt">
            <div
              className="bg-white px-6 py-4 rounded-lg shadow-lg w-4/5 overflow-y-auto"
              style={{ maxHeight: "90vh" }}
            >
              <h6 className="text-xl font-semibold text-mainblue mb-4 text-center">
                สูตรเปรียบเทียบค่าใช้จ่ายในการเดินทางด้วยรถยนต์ไฟฟ้าและรถยนต์น้ำมัน
              </h6>
              <div className="flex flex-col justify-center items-center mb-4">
                <label className="block text-gray-600">
                  ระยะทางในการเดินทาง (กม.)
                </label>
                <input
                  type="number"
                  value={distance} // ปรับชื่อ state เป็น distance เพื่อแสดงระยะทาง
                  onChange={(e) => setDistance(Number(e.target.value))} // ใช้ setDistance แทน setElectricityCost
                  className="mt-2 p-2 w-1/2 border border-gray-300 rounded text-black"
                  placeholder="กรุณากรอกระยะทาง"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="border-r pr-4">
                  <p className="text-lg font-bold text-gray-600">
                    การเดินทางด้วยรถยนต์ไฟฟ้า
                  </p>
                  {inputMode === "carModel" ? (
                    <div>
                      <label className="block text-gray-600">
                        เลือกยี่ห้อรถ
                      </label>
                      <select
                        id="brand-select"
                        value={selectedBrand1}
                        onChange={handleBrandChange1}
                        className="border rounded-md p-2 w-full h-10 my-2 text-black"
                      >
                        <option value="">เลือกยี่ห้อรถ</option>
                        {brands1.length > 0 ? (
                          brands1.map((brand, index) => (
                            <option key={`brand-${index}`} value={brand}>
                              {brand}
                            </option>
                          ))
                        ) : (
                          <option value="">ไม่มีข้อมูล</option>
                        )}
                      </select>

                      <label className="block text-gray-600">เลือกรุ่นรถ</label>
                      <select
                        id="model-select"
                        value={selectedModel1}
                        onChange={handleModelChange1}
                        disabled={!selectedBrand1}
                        className="border rounded-md p-2 w-full h-10 text-black"
                      >
                        <option value="">เลือกรุ่นรถ</option>
                        {models1.map((model, index) => (
                          <option key={`model-${index}`} value={model}>
                            {model}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}
                  <div className="grid grid-cols-2">
                    <div className="mt-2 mx-2">
                      <label className="block text-gray-600 my-2">
                        อัตราสิ้นเปลืองไฟฟ้า (kWh/100 km)
                      </label>
                      <input
                        type="number"
                        value={powerConsumption}
                        onChange={(e) =>
                          setPowerConsumption(Number(e.target.value))
                        }
                        className="p-2 w-full border border-gray-300 rounded text-black"
                        disabled
                      />
                    </div>{" "}
                    <div className="mt-2 mx-2">
                      <label className="block text-gray-600 my-2">
                        ค่าไฟต่อหน่วย (บาท/kWh)
                      </label>
                      <input
                        type="number"
                        value={electricityCost}
                        onChange={(e) =>
                          setElectricityCost(Number(e.target.value))
                        }
                        className="p-2 w-full border border-gray-300 rounded text-black"
                      />
                    </div>
                  </div>
                </div>

                <div className="pr-4">
                  <p className="text-lg font-bold text-gray-600">
                    การเดินทางด้วยรถยนต์น้ำมัน
                  </p>
                  <div>
                    {/* ส่วน UI สำหรับเลือกรุ่นรถ */}
                    <label className="block text-gray-600">เลือกยี่ห้อรถ</label>
                    <select
                      id="brand-select"
                      value={selectedBrand2}
                      onChange={handleBrandChange2}
                      className="border rounded-md p-2 w-full h-10 my-2 text-black"
                    >
                      <option value="">เลือกยี่ห้อรถ</option>
                      {brands2.length > 0 ? (
                        brands2.map((brand, index) => (
                          <option key={`brand-${index}`} value={brand}>
                            {brand}
                          </option>
                        ))
                      ) : (
                        <option value="">ไม่มีข้อมูล</option>
                      )}
                    </select>

                    <label className="block text-gray-600">เลือกรุ่นรถ</label>
                    <select
                      id="model-select"
                      value={selectedModel2}
                      onChange={handleModelChange2}
                      disabled={!selectedBrand2}
                      className="border rounded-md p-2 w-full h-10 text-black"
                    >
                      <option value="">เลือกรุ่นรถ</option>
                      {models2.map((model, index) => (
                        <option key={`model-${index}`} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="mt-2 mx-2">
                      <label className="block text-gray-600 my-2">
                        อัตราสิ้นเปลืองน้ำมัน (km/L)
                      </label>
                      <input
                        type="number"
                        value={fuelConsumption}
                        onChange={(e) =>
                          setFuelConsumtion(Number(e.target.value))
                        }
                        className="p-2 w-full border border-gray-300 rounded text-black"
                        disabled
                      />
                    </div>
                    <div className="mt-2 mx-2 text-gray-600">
                      {/* <label className="block text-gray-600 my-2">
                        ราคาน้ำมันต่อลิตร
                      </label>
                      <input
                        type="number"
                        value={fuelPrice}
                        onChange={(e) => setFuelPrice(Number(e.target.value))}
                        className="p-2 w-full border border-gray-300 rounded text-black"
                      /> */}
                      <label className="block text-gray-600 my-2">
                        ราคาน้ำมันต่อลิตร
                      </label>
                      <select
                        value={fuelPrice}
                        onChange={(e) => {
                          console.log("Selected fuel price:", e.target.value);
                          setFuelPrice(Number(e.target.value));
                        }}
                        className="border p-2 rounded-md w-full"
                      >
                        <option value="">เลือกประเภทเชื้อเพลิง</option>
                        {fuelTypeData.map((fuel) => (
                          <option key={fuel.id} value={fuel.price}>
                            {fuel.fuelType} - {fuel.price} บาท/ลิตร
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* ผลการคำนวณ */}
              <div className="grid grid-cols-2 gap-6 mt-3">
                <div className="flex justify-center">
                  <div className="mt-2 border border-gray-300 rounded-lg p-2 w-1/2 bg-mainblue text-center shadow-md">
                    <h6 className="text-base text-white mb-2 font-prompt">
                      ค่าใช้จ่ายรถยนต์ไฟฟ้า{" "}
                      <p className="text-lg text-mainblue bg-white rounded-lg">
                        {calculateElectricCost().toFixed(2)} บาท
                      </p>
                    </h6>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="mt-2 border border-gray-300 rounded-lg p-2 w-1/2 bg-mainblue text-center shadow-md">
                    <h6 className="text-base text-white mb-2 font-prompt">
                      ค่าใช้จ่ายรถยนต์น้ำมัน
                      <p className="text-lg text-mainblue bg-white rounded-lg">
                        {calculateFuelCost().toFixed(2)} บาท
                      </p>
                    </h6>
                  </div>
                </div>
              </div>

              {/* ปุ่มปิด */}
              <div className="flex justify-center mt-6">
                <button
                  className="text-white bg-mainred hover:bg-red-600 px-4 py-2 rounded"
                  onClick={() => {
                    closeModal();
                    resetManualInputsForManual();
                  }}
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
