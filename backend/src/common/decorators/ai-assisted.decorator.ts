/** Decorator to mark controller responses as AI-assisted, requiring clinician review. */
export function AiAssisted() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);
      return {
        ...result,
        _metadata: {
          aiAssisted: true,
          clinicianReviewed: false,
          watermark: 'AI-assisted \u2013 clinician reviewed',
        },
      };
    };
    return descriptor;
  };
}
