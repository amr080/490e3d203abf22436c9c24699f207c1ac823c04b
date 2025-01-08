import React, { useState, useEffect } from 'react';
import { Box, VStack, Heading, Text, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

interface Visit {
  id: number;
  userAgent: string;
  ipAddress: string;
  createdAt: string;
}

interface UrlAnalytics {
  id: number;
  originalUrl: string;
  shortId: string;
  createdAt: string;
  visits: Visit[];
}

interface Props {
  shortId: string;
  onClose: () => void;
}

function UrlAnalytics({ shortId, onClose }: Props) {
  const [analytics, setAnalytics] = useState<UrlAnalytics | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, [shortId]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`http://localhost:3001/analytics/${shortId}`);
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  if (!analytics) {
    return <Text>Loading analytics...</Text>;
  }

  return (
    <Box mt={8} p={4} borderWidth={1} borderRadius="md">
      <VStack spacing={4} align="stretch">
        <Heading size="md">Analytics for {analytics.shortId}</Heading>
        <Text>Original URL: {analytics.originalUrl}</Text>
        <Text>Total Visits: {analytics.visits.length}</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>User Agent</Th>
              <Th>IP Address</Th>
            </Tr>
          </Thead>
          <Tbody>
            {analytics.visits.map((visit) => (
              <Tr key={visit.id}>
                <Td>{new Date(visit.createdAt).toLocaleString()}</Td>
                <Td>{visit.userAgent}</Td>
                <Td>{visit.ipAddress}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button onClick={onClose}>Close Analytics</Button>
      </VStack>
    </Box>
  );
}

export default UrlAnalytics;

