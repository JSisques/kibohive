'use client';

import { useParams } from 'next/navigation';
import React from 'react';

const TaskPage = () => {
  const { id } = useParams();
  return <div>Task {id}</div>;
};

export default TaskPage;
