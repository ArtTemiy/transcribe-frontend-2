import { Container } from 'react-bootstrap';

import { Text } from '@/components/ui/Text';

const ApiDocsPage = () => {
    return (
        <Container className='py-5 d-flex flex-column gap-2'>
            <Text variant='display'>PDF Converter API Documentation</Text>
            
            <Text variant='header'>Overview</Text>
            <Text variant='body-s'>
                The PDF Converter API provides two main endpoints for converting PDF files and managing conversion jobs.
            </Text>
            
            <Text variant='header'>Authentication</Text>
            <Text variant='body-s'>
                Header: X-API-Key: YOUR_TOKEN<br/>
                How to get API key: Available in your account settings on the website.
            </Text>
            
            <Text variant='header'>Endpoints</Text>
            
            <Text variant='title'>Convert PDF</Text>
            <Text variant='body-s'>
                <strong>POST /api/v1/api/convert</strong><br/>
                Converts a PDF file to the specified format.
            </Text>
            
            <Text variant='caption'>Request Body:</Text>
            <Text variant='body-s' style={{ fontFamily: 'monospace', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', display: 'block' }}>
                {`{
  "file": "base64_encoded_pdf_content",
  "password": "optional_pdf_password",
  "result_file_type": "csv"
}`}
            </Text>
            
            <Text variant='caption'>Parameters:</Text>
            <Text variant='body-s'>
                - <strong>file</strong> (required): Base64 encoded PDF file<br/>
                - <strong>password</strong> (optional): PDF password if file is protected<br/>
                - <strong>result_file_type</strong> (required): Output format - csv, xlsx, or json
            </Text>
            
            <Text variant='caption'>Response:</Text>
            <Text variant='body-s' style={{ fontFamily: 'monospace', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', display: 'block' }}>
                {`{
  "success": true,
  "job_id": "task-id-123",
  "pages_used": 2,
  "pages_remaining": 98
}`}
            </Text>
            
            <Text variant='title'>Get Jobs</Text>
            <Text variant='body-s'>
                <strong>GET /api/v1/api/jobs</strong><br/>
                Retrieves a list of all conversion jobs for the authenticated user.
            </Text>
            
            <Text variant='caption'>Response:</Text>
            <Text variant='body-s' style={{ fontFamily: 'monospace', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', display: 'block' }}>
                {`{
  "success": true,
  "jobs": [
    {
      "id": "task-id-123",
      "status": "completed",
      "pages_used": 2,
      "created_at": "2024-01-01T12:00:00Z",
      "result_file_type": "csv"
    }
  ],
  "total_pages_used": 2,
  "pages_remaining": 98
}`}
            </Text>
            
            <Text variant='caption'>Job Status Values:</Text>
            <Text variant='body-s'>
                - <strong>processing</strong> - Conversion in progress<br/>
                - <strong>completed</strong> - Conversion finished successfully<br/>
                - <strong>error</strong> - Conversion failed
            </Text>
        </Container>
    );
};

export default ApiDocsPage;
