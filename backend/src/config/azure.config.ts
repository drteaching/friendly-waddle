import { ConfigService } from '@nestjs/config';

/**
 * Azure services configuration factory.
 * Provides connection details for Azure Blob Storage and Azure OpenAI services.
 */
export const azureStorageConfig = (configService: ConfigService) => ({
  connectionString: configService.get<string>('AZURE_STORAGE_CONNECTION_STRING', ''),
  containers: {
    evidence: configService.get<string>('AZURE_STORAGE_CONTAINER_EVIDENCE', 'evidence-uploads'),
    videos: configService.get<string>('AZURE_STORAGE_CONTAINER_VIDEOS', 'surgical-videos'),
    documents: configService.get<string>('AZURE_STORAGE_CONTAINER_DOCUMENTS', 'patient-documents'),
  },
});

export const azureAiConfig = (configService: ConfigService) => ({
  endpoint: configService.get<string>('AZURE_OPENAI_ENDPOINT', ''),
  apiKey: configService.get<string>('AZURE_OPENAI_API_KEY', ''),
  deploymentName: configService.get<string>('AZURE_OPENAI_DEPLOYMENT_NAME', ''),
});
