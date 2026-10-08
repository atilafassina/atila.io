export interface VideoProps {
  id: {
    videoId: {
      videoId: string;
    };
  };
  snippet: {
    title: string;
    publishedAt: string;
    description: string;
    thumbnails: {
      high: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
    };
  };
}

// A channel's uploads playlist id is its channel id with the "UC" prefix swapped for "UU".
// playlistItems costs 1 quota unit per call; search costs 100 and exhausts the daily quota fast.
const uploadsPlaylistId = () => `UU${process.env.YOUTUBE_CHANNEL_ID?.slice(2)}`;

export async function getVideos(results = 21): Promise<VideoProps[]> {
  const ENDPOINT = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId()}&key=${process.env.YOUTUBE_API_TOKEN}&maxResults=${results}`;
  const data = await fetch(ENDPOINT).then((r) => r.json());

  if (data.error) {
    console.error("Failed to fetch videos:", data.error.message);
    return [];
  }

  if (Array.isArray(data.items)) {
    const videos = data.items
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((item: any) => item.snippet?.thumbnails?.medium)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => ({
        id: {
          videoId: { videoId: item.snippet.resourceId.videoId },
        },
        snippet: {
          title: item.snippet.title,
          publishedAt: item.snippet.publishedAt,
          description: item.snippet.description,
          thumbnails: item.snippet.thumbnails,
        },
      }));

    return videos as VideoProps[];
  }

  return [];
}
