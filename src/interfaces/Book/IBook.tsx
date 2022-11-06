
interface IndustryIdentifier {
    type: string;
    identifier: string;
}

interface ReadingModes {
    text: boolean;
    image: boolean;
}

interface Dimensions {
    height: string;
    width: string;
    thickness: string;
}

interface PanelizationSummary {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
}

interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
}

export interface IVolumeInfo {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: IndustryIdentifier[];
    readingModes: ReadingModes;
    pageCount: number;
    printedPageCount: number;
    dimensions: Dimensions;
    printType: string;
    categories: string[];
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: PanelizationSummary;
    imageLinks: ImageLinks;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
}

interface SaleInfo {
    country: string;
    saleability: string;
    isEbook: boolean;
}

interface Epub {
    isAvailable: boolean;
}

interface Pdf {
    isAvailable: boolean;
}

interface AccessInfo {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: Epub;
    pdf: Pdf;
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
}

export interface IBook {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: IVolumeInfo;
    saleInfo: SaleInfo;
    accessInfo: AccessInfo;
}




