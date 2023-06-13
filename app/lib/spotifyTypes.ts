type PlaylistItem = {
    collaborative: boolean,
    description: string,
    external_urls: { spotify: string },
    href: string,
    id: string,
    images: SpotifyImage[],
    name: string,
    public: boolean
    snapshot_id: string,
    tracks: {href: string, total: number}[],
    type: "playlist",
    uri: string
}

type SpotifyImage = {
    url: string,
    height: number,
    width: number,
}