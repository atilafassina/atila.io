export interface VideoProps {
  id: {
    videoId: {
      videoId: string
    }
  }
  snippet: {
    title: string
    publishedAt: string
    description: string
    thumbnails: {
      high: { url: string; width: number; height: number }
      medium: { url: string; width: number; height: number }
    }
  }
}

export async function getVideos(results = 21): Promise<VideoProps[]> {
  const ENDPOINT = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${
    import.meta.env.YOUTUBE_CHANNEL_ID
  }&key=${
    import.meta.env.YOUTUBE_API_TOKEN
  }&type=video&order=date&maxResults=${results}`
  const data = await fetch(ENDPOINT).then((r) => r.json())

  if (Array.isArray(data.items) && data.items.length > 1) {
    const videos = data.items?.map((item: any) => ({
      id: {
        videoId: item.id,
      },
      snippet: {
        title: item.snippet?.title,
        publishedAt: item.snippet?.publishedAt,
        description: item.snippet?.description,
        thumbnails: item.snippet!.thumbnails!,
      },
    }))

    return videos as VideoProps[]
  } else {
    return []
  }
}
