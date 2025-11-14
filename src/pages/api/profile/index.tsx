import React from 'react';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/config/prisma';

export default async function PROFILE(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Handle GET request
    prisma.user
      .findFirst({
        where: {
          id: '1231231233',
        },
      })
      .then((user) => {
        console.log('user :>> ', user);
        res.status(200).json(user);
      });
  } else if (req.method === 'POST') {
    // Handle POST request
    const { adress, city, country, userBio } = req.body;

    try {
      const profile = await prisma.profile.create({
        data: {
          userId: '1231231233',
          address: adress,
          city: city,
          country: country,
          bio: userBio,
          image: '',
          createdBy: '1231231233',
        },
      });
      res.status(201).json(profile);
    } catch (error) {
      console.error('Error creating profile:', error);
      res.status(500).json({ error: 'Error creating profile' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
