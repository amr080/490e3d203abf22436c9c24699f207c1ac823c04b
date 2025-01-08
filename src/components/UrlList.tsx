import React, { useState, useEffect } from 'react';
import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react';
import UrlAnalytics from './UrlAnalytics';

interface Url {
  id: number;
  originalUrl: string;
  shortId: string;
  createdAt: string;
}

function UrlList() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await fetch('http://localhost:3001/urls');
      const data = await response.json();
      setUrls(data);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  return (
    <Box width="100%">
      <Heading size="md" mb={4}>Your Shortened URLs</Heading>
      <VStack spacing={4} align="stretch">
        {urls.map((url) => (
          <Box key={url.id} p={4} borderWidth={1} borderRadius="md">
            <Text>Original URL: {url.originalUrl}</Text>
            <Text>Short URL: http://localhost:3001/{url.shortId}</Text>
            <Button
              mt={2}
              size="sm"
              colorScheme="teal"
              onClick={() => setSelectedUrl(url.shortId)}
            >
              View Analytics
            </Button>
          </Box>
        ))}
      </VStack>
      {selectedUrl && <UrlAnalytics shortId={selectedUrl} onClose={() => setSelectedUrl(null)} />}
    </Box>
  );
}

export default UrlList;

