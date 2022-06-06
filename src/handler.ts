import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Scale, Cast } from './enums';
import {
  ScaleConversionRequest, ScaleConversionWithCastRequest,
  ScaleConversionResponse,
} from './types';


export async function handle(
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> {
  console.log('event 👉', event);
  if (!event.body) {
    return {
      body: JSON.stringify({ message: 'Invalid or no body found' }),
      statusCode: 422,
    };
  }

  if (event.rawPath === "/api/convert") {
    const body: ScaleConversionWithCastRequest = JSON.parse(event.body);
    // TODO: Validation can we done with a elaborate validation library
    console.log("Request body", body);
    if (!validateCastOperationField(body.cast)) {
      return {
        body: JSON.stringify({ message: 'Invalid Payload field *cast*' }),
        statusCode: 422,
      };
    }

    if (body.cast === Cast.CTOF) {
      return getLambdaResponse(200, getResponseBody(body.value, Scale.F, celciusToFarenhiet));
    } else {
      return getLambdaResponse(200, getResponseBody(body.value, Scale.C, farenheitToCelcius));
    }

  }

  if (event.rawPath === "/api/convert/celcius") {
    const body: ScaleConversionRequest = JSON.parse(event.body);
    return getLambdaResponse(200, getResponseBody(body.value, Scale.F, celciusToFarenhiet));
  }

  if (event.rawPath === "/api/convert/farenheit") {
    const body: ScaleConversionRequest = JSON.parse(event.body);
    return getLambdaResponse(200, getResponseBody(body.value, Scale.C, farenheitToCelcius));
  }

  return {
    body: JSON.stringify({ message: 'No Route Matched' }),
    statusCode: 404,
  };
}



function getResponseBody(value: number, scale: Scale, fn: (value: number) => number): ScaleConversionResponse {
  const response: ScaleConversionResponse = {
    scale,
    value: fn(value),
  }
  return response;
}

function getLambdaResponse(statusCode: number, body: ScaleConversionResponse): APIGatewayProxyResultV2 {
  return {
    body: JSON.stringify(body),
    statusCode: statusCode,
  }
}

export const celciusToFarenhiet = (value: number): number => {
  return (value * 9 / 5) + 32
}

export const farenheitToCelcius = (value: number): number => {
  return ((value - 32) * 5 / 9)
}

export function validateCastOperationField(value: string): boolean {
  if (value && (value === Cast.CTOF || value === Cast.FTOC)) {
    return true
  } else {
    return false
  }
}