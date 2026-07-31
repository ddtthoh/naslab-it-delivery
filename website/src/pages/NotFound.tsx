/** Catch-all for unmatched paths. No frozen copy exists for a 404 page. */

import { ROUTES } from "../content/frozen";
import { Block, CtaLink, CtaRow, PageHead } from "../components/ui";

export default function NotFound() {
  return (
    <Block>
      <PageHead kicker="404" title="Page not found.">
        <CtaRow>
          <CtaLink to={ROUTES.home} variant="solid">
            HOME
          </CtaLink>
        </CtaRow>
      </PageHead>
      <p className="gap-note">
        CONTENT GAP — no 404 copy exists in CONTENT-FREEZE.md. Placeholder.
      </p>
    </Block>
  );
}
