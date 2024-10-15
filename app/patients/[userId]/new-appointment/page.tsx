import Image from "next/image";
import { Button } from "@/components/ui/button"
import AppointmentForm from "@/components/forms/AppointmentForm";
import Link from "next/link";
import { getPatient } from "@/lib/actions/patient.actions";

const NewAppointment = async({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">
    <section className="remove-srollbar container">
      <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image src="/assets/icons/logo-full.svg" alt="Logo"
          height={1000}
          width={10000}
          className="mb-12 h-10 w-fit" 
          />
          <AppointmentForm 
          patientId={patient?.$id}
          userId={userId}
          type="create"
          />
          <p className="copyright mt-10 my-auto">
          © 2024 CarePulse
          </p>
        </div>
      </section>
      <Image
      src="/assets/images/appointment-img.png"
      height={1000}
      width={1000}
      alt="patient"
      className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}

export default NewAppointment
