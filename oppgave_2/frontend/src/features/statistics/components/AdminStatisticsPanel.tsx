"use client";

import { useState } from "react";
import getAll  from '@/features/registration/hooks/useRegistration'



export default function AdminStatisticsPanel() {

  console.log("hi " + JSON.stringify(getAll))

  return (
    <>
      <h2>Bavian</h2>
    </>
  );
}
