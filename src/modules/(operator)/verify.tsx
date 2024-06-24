"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { cn } from "@/utils";
import { verifyOperator as verify } from "@/actions/verification";
import { VerifyOperatorSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multiSelect";
import { X } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  label: string;
  options: Option[];
};

interface DataProps {
  ninNumber?: string;
  cacNumber?: string;
  mobilityType?: string[];
  driversLicense?: string;
  vechLicense?: string;
  document?: string[];
}

const MoblityType: MultiSelectProps[] = [
  {
    label: "Mobility Type",
    options: [
      { label: "Car", value: "Car" },
      { label: "Van", value: "Van" },
      { label: "Truck", value: "Truck" },
      { label: "Bike", value: "Bike" },
    ],
  },
];

const VerifyOperator = () => {
  const { toast } = useToast();
  const [data, setData] = useState<DataProps>();
  const [isLoading, startTransition] = useTransition();
  const [documents, setDocuments] = useState<File[]>([]);
  const [verificationType, setVerificationType] = useState<"NIN" | "CAC">(
    "NIN"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleMoblityChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map(
      (option: Option) => option.value
    );

    setData((prevData) => ({
      ...prevData,
      mobilityType: selectedValues,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setDocuments([...documents, files[0]]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  console.log(documents);

  return (
    <main className="flex flex-col py-4 w-full">
      <div className="md:w-[70%]">
        <p className="first-line:tracking-widest first-letter:text-3xl md:first-letter:text-7xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left">
          At viscio before you get your verification badge we need to confirm a
          few things
        </p>
      </div>
      <form
        action=""
        className="flex w-full flex-col gap-4 gap-y-8 md:gap-8  py-4 sm:px-4 md:px-6 lg:px-8 h-full items-start font-worksans"
        onSubmit={onSubmit}
      >
        {/* content */}
        <div className="flex w-full flex-col gap-y-4 sm:gap-y-6 pt-8 md:pt-0">
          {/* Verification Type */}
          <div className="w-full flex-col justify-start items-start gap-1.5 flex">
            <div className="flex flex-col items-start gap-2 justify-between rounded-lg border p-4 w-full">
              <div className="space-y-0.5">
                <Label
                  htmlFor=""
                  className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                >
                  Verification Type
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="7"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </Label>
                <p className="text-xs md:text-base">
                  How Do we Verify your Account
                </p>
              </div>
              <div>
                <RadioGroup
                  value={verificationType}
                  className="flex w-full gap-4"
                  onValueChange={(value) => {
                    setVerificationType(value as "CAC" | "NIN");
                    setData((prevData) => ({
                      ...prevData,
                      [verificationType === "NIN" ? "ninNumber" : "cacNumber"]:
                        "",
                    }));
                  }}
                >
                  <div className="flex flex-col items-start space-y-2">
                    <Label htmlFor="ninVerification">NIN Verification</Label>
                    <RadioGroupItem value="NIN" id="ninVerification" />
                  </div>
                  <div className="flex flex-col items-start space-y-2">
                    <Label htmlFor="cacVerification">CAC Verification</Label>
                    <RadioGroupItem value="CAC" id="cacVerification" />
                  </div>
                </RadioGroup>
              </div>
              <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                <Label
                  htmlFor="verification"
                  className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                >
                  {verificationType} Number
                </Label>
                <Input
                  type="text"
                  id="verification"
                  name={verificationType === "NIN" ? "ninNumber" : "cacNumber"}
                  disabled={isLoading}
                  value={
                    verificationType === "NIN"
                      ? data?.ninNumber
                      : data?.cacNumber
                  }
                  onChange={handleChange}
                  className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex h-[56px]"
                  placeholder="your verification number"
                />
              </div>
            </div>
          </div>
          {/* Moblity Type */}
          <div className="w-full flex-col justify-start items-start gap-1.5 flex">
            <div className="flex flex-col items-start gap-2 justify-between rounded-lg border p-4 w-full">
              <div className="space-y-0.5">
                <Label
                  htmlFor=""
                  className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                >
                  Moblity Type
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="7"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </Label>
                <p className="text-xs md:text-base">
                  The type of moblity yu have
                </p>
              </div>
              <MultiSelect
                isDisabled={isLoading}
                id="multiSelect"
                options={MoblityType}
                className="w-full sele"
                placeholder="Where do you belong ..."
                hideSelectedOptions
                isSearchable
                aria-label="multiSelect"
                aria-labelledby="multiSelect"
                onChange={handleMoblityChange}
                noOptionsMessage={() => (
                  <div className="text-gray-600 text-sm">Not Available</div>
                )}
              />
            </div>
          </div>
          {/* Vehicle Linces */}
          <div className="w-full flex-col justify-start items-start gap-1.5 flex">
            <div className="flex flex-col items-start gap-2 justify-between rounded-lg border p-4 w-full">
              <div className="space-y-0.5">
                <Label
                  htmlFor=""
                  className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                >
                  Vehicle Reigstration Number
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="7"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </Label>
                <p className="text-xs md:text-base">Your Plate number</p>
              </div>
              <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                <Label
                  htmlFor="Plate Number"
                  className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                >
                  Plate Number
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="7"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </Label>
                <Input
                  type="text"
                  id="Plate Number"
                  name="Plate Number"
                  disabled={isLoading}
                  value={data?.vechLicense}
                  onChange={handleChange}
                  className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex h-[56px] placeholder:text-sm"
                  placeholder="at least one of your vehicles place number"
                />
              </div>
            </div>
          </div>
          {/* Images */}
          <div className="w-full flex-col justify-start items-start gap-1.5 flex">
            <div className="flex flex-col items-start gap-2 justify-between rounded-lg border p-4 w-full">
              <div className="space-y-0.5">
                <Label
                  htmlFor=""
                  className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                >
                  Documents
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="7"
                    viewBox="0 0 7 7"
                    fill="none"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </Label>
                <p className="text-xs md:text-base">
                  Image of your {verificationType} Id and if possible your plate
                  number
                </p>
              </div>
              <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                <div className="flex justify-between w-full">
                  <Label
                    htmlFor=""
                    className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                  >
                    Image
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="7"
                      height="7"
                      viewBox="0 0 7 7"
                      fill="none"
                    >
                      <path
                        d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                        fill="#EF4444"
                      />
                    </svg>
                  </Label>
                  <button
                    type="button"
                    tabIndex={0}
                    aria-label="Remove image"
                    onClick={() => setDocuments([])}
                    className="text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light rounded-full bg-white/60 backdrop-blur-sm absolute top-1 right-1 w-8 h-8 flex items-center justify-center hover:text-red-500 hover:bg-white/80 hover:brightness-150 transition-all duration-700 hover:duration-200"
                    title="Remove image"
                  >
                    <X size={18} />
                  </button>
                </div>
                {documents.map((doc, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span>{doc.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(i)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <Label
                  htmlFor="documents"
                  className={cn(
                    "rounded-lg border bg-primary text-white min-[450px]:w-[178px] py-4 min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary text-center items-center"
                  )}
                >
                  Choose Image
                </Label>
                <Input
                  type="file"
                  id="documents"
                  name="documents"
                  disabled={isLoading}
                  className="hidden sr-only"
                  accept="image/jpeg,image/png,image/svg+xml"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export { VerifyOperator };
