type PlaylistItem = {
    collaborative: boolean,
    description: string,
    external_urls: { spotify: string },
    href: string,
    id: string,
    images: SpotifyImage[],
    name: string,
    owner: SpotifyOwner
    public: boolean
    snapshot_id: string,
    tracks: {href: string, total: number}[],
    type: "playlist",
    uri: string
}

type TrackItem = {
    added_at: string,
    added_by: Omit<SpotifyOwner, 'display_name'>,
    is_local: boolean,
    primary_color: null,
    track: Track
}


type Track = {
    album: Album,
    artists: Artist,
    available_markets: string[],
    disc_number: number,
    duration_ms: number,
    episode: boolean,
    explicit: boolean,
    href: string,
    id: string,
    is_local: boolean,
    name: string,
    popularity: number,
    preview_url: string,
    track: boolean,
    track_number: number,
    type: "track"
}

type Album = {
    album_type: "album",
    artists: Artist[],
    available_markets: string[]
    href: string,
    id: string,
    images: SpotifyImage[],
    name: string,
    release_date: string,
    total_tracks: number,
    type: "album",
    uri: string
}

type Artist = {
    href: string,
    id: string,
    name: string,
    type: "artist",
    uri: string
}

type SpotifyImage = {
    url: string,
    height: number,
    width: number,
}

type SpotifyOwner = {
    display_name: string,
    href: string,
    id: string,
    type: "user",
    uri: string
}