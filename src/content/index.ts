import type { Resume } from "../types.ts";
import { profile } from "./profile.ts";
import { fete } from "./fete.ts";
import { legacy } from "./legacy.ts";
import { modernAge } from "./modern-age.ts";
import { away } from "./away.ts";
import { bonobos } from "./bonobos.ts";
import { mashStudio } from "./mash-studio.ts";
import { cropup } from "./cropup.ts";
import { bigFuel } from "./big-fuel.ts";
import { internationalMasters } from "./international-masters.ts";
import { sourcemedia } from "./sourcemedia.ts";
import { centralParkMedia } from "./central-park-media.ts";

/**
 * The resume, assembled.
 *
 * The order of `jobs` is the order they appear in both outputs. It is set
 * explicitly rather than sorted by date: the date fields are display strings
 * in mixed formats ("2000 - 2006" has no months), so sorting on them would
 * make a typo in a date silently reorder the resume. validate.ts warns if this
 * list stops being reverse-chronological.
 */
export const resume: Resume = {
  ...profile,
  jobs: [
    fete,
    legacy,
    modernAge,
    away,
    bonobos,
    mashStudio,
    cropup,
    bigFuel,
    internationalMasters,
    sourcemedia,
    centralParkMedia,
  ],
};
