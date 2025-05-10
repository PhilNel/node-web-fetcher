export function isLambdaRuntime(): boolean {
    return !!process.env.AWS_LAMBDA_RUNTIME_API;
}