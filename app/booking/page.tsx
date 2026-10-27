import { prisma } from "../../lib/prisma";
import AppointmentForm from "../components/AppointmentForm";

interface BookingPageProps {
  searchParams: Promise<{
    serviceId?: string;
  }>;
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const { serviceId } = await searchParams;

  let service = null;
  if (serviceId) {
    service = await prisma.service.findUnique({
      where: { id: serviceId },
    });
  }

  return <AppointmentForm service={service} />;
}