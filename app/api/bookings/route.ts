import { NextResponse } from "next/server";

import { getPool } from "@/lib/db";
import { PetType, services } from "@/lib/services";

export const runtime = "nodejs";

type BookingPayload = {
  contactName?: unknown;
  phone?: unknown;
  petName?: unknown;
  petType?: unknown;
  serviceIndex?: unknown;
  preferredDate?: unknown;
};

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isPetType(value: unknown): value is PetType {
  return value === "dog" || value === "cat";
}

export async function POST(request: Request) {
  let payload: BookingPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "请求内容格式错误" }, { status: 400 });
  }

  const contactName = cleanText(payload.contactName);
  const phone = cleanText(payload.phone);
  const petName = cleanText(payload.petName);
  const preferredDate = cleanText(payload.preferredDate);
  const serviceIndex = Number(payload.serviceIndex);

  if (
    contactName.length < 1 ||
    contactName.length > 30 ||
    !/^1[3-9]\d{9}$/.test(phone) ||
    petName.length < 1 ||
    petName.length > 30 ||
    !isPetType(payload.petType) ||
    !Number.isInteger(serviceIndex) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)
  ) {
    return NextResponse.json({ error: "请检查预约信息后重试" }, { status: 400 });
  }

  const service = services[payload.petType][serviceIndex];
  if (!service) {
    return NextResponse.json({ error: "所选洗护项目无效" }, { status: 400 });
  }

  try {
    const result = await getPool().query<{ id: string; created_at: Date }>(
      `insert into public.bookings
        (contact_name, phone, pet_name, pet_type, service_name, service_price, preferred_date)
       select $1, $2, $3, $4, $5, $6, $7::date
       where $7::date >= current_date
       returning id, created_at`,
      [
        contactName,
        phone,
        petName,
        payload.petType,
        service.name,
        service.price,
        preferredDate,
      ],
    );

    if (result.rowCount !== 1) {
      return NextResponse.json({ error: "期望日期不能早于今天" }, { status: 400 });
    }

    return NextResponse.json(
      {
        id: result.rows[0].id,
        createdAt: result.rows[0].created_at,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create booking", error);
    return NextResponse.json({ error: "预约提交失败，请稍后重试" }, { status: 500 });
  }
}
