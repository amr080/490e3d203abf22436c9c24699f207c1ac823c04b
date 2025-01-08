import React, { useState } from 'react';
import { ChakraProvider, Box, VStack, Heading, Input, Button, Text, useToast } from '@chakra-ui/react';
import UrlList from './components/UrlList';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setShortUrl(`http://localhost:3001/${data.shortId}`);
      toast({
        title: 'URL shortened successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error shortening URL',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Box maxWidth="800px" margin="auto" padding={8}>
        <VStack spacing={8}>
          <Heading>Advanced URL Shortener</Heading>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to shorten"
              />
              <Button type="submit" colorScheme="blue">Shorten URL</Button>
            </VStack>
          </form>
          {shortUrl && (
            <Text>
              Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
            </Text>
          )}
          <UrlList />
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;

