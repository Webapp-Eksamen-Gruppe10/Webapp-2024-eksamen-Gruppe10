import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Participant = {
  id: string;
  name: string;
  email: string;
  status: string;
};

