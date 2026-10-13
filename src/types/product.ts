
// Defines the detailed data structure for an individual product entity matching the API response.
export interface Iproduct {
    _id: string;
    id?: string;
    title: string;
    slug?: string;
    description: string;
    price: number;
    priceAfterDiscount?: number;
    quantity: number;
    sold?: number;
    imageCover: string;
    images: string[];
    ratingsAverage: number;
    ratingsQuantity: number;
    category: {
        _id: string;
        name: string;
        slug?: string;
        image?: string;
    };
    subcategory?: {
        _id: string;
        name: string;
        slug?: string;
        category?: string;
    }[];
    brand: {
        _id: string;
        name: string;
        slug?: string;
        image?: string;
    };
    createdAt?: string;
    updatedAt?: string;
    availableColors?: string[];
    reviews?: IReview[];
}

// Backward-compatible alias for existing imports
export type Daum = Iproduct;

// Metadata for paginated product lists
export interface IProductMetadata {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
}

// Defines the data structure for the paginated product API response.
export interface IProductResponse {
    results: number;
    metadata: IProductMetadata;
    data: Iproduct[];
    discountPercent?: number;
}

// Defines the data structure for a single product review.
export interface IReview {
    _id: string
    review?: string
    rating: number
    product?: string
    user?: {
        _id: string
        name: string
    }
    createdAt?: string
    updatedAt?: string
}


