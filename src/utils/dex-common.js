const { URL } = require('url');
// "scroll" is a minimal markup language designed to create mobile-friendly
// html contents. scroll is designed to be easily written and edited on
// mobile devices - primarily by using emojis as rendering instructions.
// like markdown, there is no illegal scroll code. syntax is designed to
// limit and isolate the impact of syntax irregularity, so that the syntax-
// compliant parts of the source determine the outcome.

// it's a markup language of pure decadent fun - no gates, no compound constructs, no
// epistemological hardpoints to internalize before you can be one with the compiler -
// no errors, no failures, no surprises other than pleasant ones. scroll is about one thing
// - it's fun to breathe life into text, and fun is the only way to get anyone reading.

export function renderScroll(scrollText) {
  const lines = escapeHTML(scrollText).split('\n');

  // a scroll is a linear list of "items," and each item starts with a "++" on a new line,
  // followed by the item's type. For example, "\n++text" is how you open a text item, "\n++image"
  // defines an image item.
  // Each item is done
  const items = lines.reduce((blocks, line) => {
    if (line.trim().startsWith('++')) {
      blocks.push([line]);
    } else if (blocks.length > 0) {
      blocks[blocks.length - 1].push(line);
    }
    return blocks;
  }, []);

  // render items into HTML and return.
  return style + items.map(renderScrollItem).join('');
}

function renderScrollItem(block) {
  // Each item is made of two parts:
  // 1. the first line that contains the item initializer (++type), followed by a list of space-separated "tags."
  // e.g. "++text center large thick #FF0000" creates a text item with large, bold font in the center in red.
  // 2. the rest of the lines, which define the contents of the item.
  const [itemConfig, ...contentLines] = block;

  const parts = itemConfig.substring(2).trim().split(/\s+/);
  const itemType = parts.shift();

  if (!itemTypeRenderers.hasOwnProperty(itemType)) {
    // unknown item type
    return '';
  }

  const filtered = contentLines.filter((s) => s !== ''); // merges repeated newlines into one newline
  const rendered = itemTypeRenderers[itemType](parts, filtered);
  return rendered;
}

const itemTypeRenderers = {
  text: function (tags, contentLines) {
    const body = contentLines.join('<br>').trim();
    let style = '';
    for (const tag of tags) {
      switch (tag) {
        /* text align */
        case 'center':
          style += 'text-align: center;';
          break;
        case 'left':
          style += 'text-align: left;';
          break;
        case 'right':
          style += 'text-align: right;';
          break;
        /* font size */
        case 'xxsmall':
          style += 'font-size: 24px;';
          break;
        case 'xsmall':
          style += 'font-size: 30px;';
          break;
        case 'small':
          style += 'font-size: 36px;';
          break;
        case 'medium':
          style += 'font-size: 48px;';
          break;
        case 'large':
          style += 'font-size: 60px;';
          break;
        case 'xlarge':
          style += 'font-size: 75px;';
          break;
        case 'xxlarge':
          style += 'font-size: 105px;';
          break;
        /* text weight */
        case 'thin':
          style += 'font-weight: lighter;';
          break;
        case 'regular':
          style += 'font-weight: normal;';
          break;
        case 'thick':
          style += 'font-weight: bold;';
          break;
        case 'thicker':
          style += 'font-weight: bolder;';
          break;
        /* etc. */
        case 'break':
          style += 'margin-top: 10px;';
          break;
        default:
          // if tag starts with a sharp, parse it as an rgb color
          if (tag.startsWith('#')) {
            style += `color: ${tag};`;
          }
      }
    }

    const modified = mod(
      mod(
        mod(
          mod(
            mod(
              mod(
                mod(
                  mod(
                    mod(
                      mod(
                        mod(
                          mod(
                            mod(
                              mod(
                                mod(
                                  mod(
                                    mod(body, false, '🚧', '', function () {
                                      return '';
                                    }),
                                    true,
                                    '🌈',
                                    'scroll-rainbow',
                                  ),
                                  true,
                                  '💅',
                                  'scroll-fabulous',
                                ),
                                true,
                                '👿',
                                'scroll-mad',
                              ),
                              true,
                              '👻',
                              'scroll-ghost',
                            ),
                            true,
                            '💫',
                            'scroll-dizzy',
                          ),
                          true,
                          '🌊',
                          '',
                          function (inner) {
                            let acc = '';
                            let i = 0;
                            const letterDelay = 750 / inner.length;
                            for (const letter of inner) {
                              acc += `<span class="scroll-wave" style="animation-delay:${i++ * letterDelay}ms;">${letter}</span>`;
                            }
                            return acc;
                          },
                        ),
                        true,
                        '💙',
                        'scroll-blue',
                      ),
                      true,
                      '❤️',
                      'scroll-red',
                    ),
                    true,
                    '💚',
                    'scroll-green',
                  ),
                  true,
                  '💛',
                  'scroll-yellow',
                ),
                true,
                '💜',
                'scroll-purple',
              ),
              true,
              '💋',
              'scroll-kiss',
            ),
            true,
            '✨',
            'scroll-shine',
          ),
          true,
          '🎉',
          'scroll-wow',
        ),
        false,
        '**',
        'scroll-italic',
      ),
      false,
      '__',
      'scroll-bold',
    );

    const hyperlinkRegex = /(?:\{([^\}]+)\})?\[([^\]]+)\]\(([^\)]+)\)/g;

    const hyperlinked = modified.replace(hyperlinkRegex, (match, icon, title, address) => {
      function brandIcons(addr) {
        const brandmap = {
          'youtube.com': 'youtube',
          'instagram.com': 'instagram',
          'twitter.com': 'twitter',
          'amazon.com': 'amazon',
          'steampowered.com': 'steam',
          'github.com': 'github',
          'linkedin.com': 'linkedin',
          'reddit.com': 'reddit',
          'tiktok.com': 'tiktok',
          'wechat.com': 'wechat',
          'snapchat.com': 'snapchat',
          'twitch.com': 'twitch',
          'paypal.com': 'paypal',
        };

        return brandmap[getDomainFromUrl(addr)];
      }

      const iconName = icon || brandIcons(address) || 'globe';

      return `<a href="${address}"><i style="text-decoration: underline; ${style}" class="bi-${iconName} icon-right"></i>${title}</a>`;
    });

    return '<p class="mb-2" style="' + style + '">' + hyperlinked + '</p>';
  },
  image: function (tags, contentLines) {
    const lines = contentLines.map((line) => line.trim()).filter((line) => line !== '');

    let style = '';
    let classes = '';
    let columns = 1;
    for (const tag of tags) {
      switch (tag) {
        /* framing tags */
        case 'square':
          style += 'border-radius: 0px;';
          break;
        case 'rounded':
          style += 'border-radius: 30px;';
          break;
        case 'circle':
          style += 'border-radius: 50%;';
          break;
        /* size tags */
        case 'large':
          classes += 'px-1';
          break;
        case 'medium':
          classes += 'px-3';
          break;
        case 'small':
          classes += 'px-5';
          break;
        /* columns */
        case '2-columns':
          columns = 2;
          break;
        case '3-columns':
          columns = 3;
          break;
        case '4-columns':
          columns = 4;
          break;
        default:
          break;
      }
    }

    let acc = '';
    for (let i = 0; i < lines.length; i++) {
      if (i % columns === 0) {
        acc += `<div class="row row-cols-${columns} g-1 mb-1 ${classes}">`;
      }

      acc += `<img class="col img-fluid " src="${lines[i]}" style="${style}"/>`;

      if (i % columns === columns - 1 || i == lines.length - 1) {
        acc += '</div>';
      }
    }

    return acc;
  },
};

function getDomainFromUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
}

function mod(content, exposed, emoji, effectClass, transformer) {
  let modifiedContent = '';
  let emojiStart = -1;

  for (let i = 0; i < content.length; i++) {
    if (content.substring(i, i + emoji.length) === emoji) {
      if (emojiStart === -1) {
        // Found the starting emoji
        emojiStart = i;
        modifiedContent += content.substring(0, i); // Add text before the emoji
        content = content.substring(i + emoji.length);
        i = -1; // Reset index
      } else {
        // Found the closing emoji

        const finalContent =
          transformer == null ? content.substring(0, i) : transformer(content.substring(0, i));
        modifiedContent += `${exposed ? emoji : ''} <span class="${effectClass}">${finalContent}</span> ${exposed ? emoji : ''}`;
        content = content.substring(i + emoji.length);
        i = -1; // Reset index
        emojiStart = -1; // Reset start position
      }
    }
  }

  // Add any remaining text if there's no closing emoji
  if (emojiStart === -1) {
    modifiedContent += content;
  } else {
    // If there was an unmatched opening emoji, include it as plain text
    modifiedContent += emoji + content;
  }

  return modifiedContent;
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function (match) {
    switch (match) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#039;';
    }
  });
}

const style = `<style>
    .icon-right {
        margin-right: .2rem
    }

    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(-3px);
        }
        50%, 70% {
            transform: translateY(0);
        }
    }

    @keyframes slam {
        0%, 100% {
            transform: translateY(0);
        }
        70% {
            transform: translateY(-5px);
        }
        80%, 90% {
            transform: translateY(0);
        }
    }

    @keyframes sway {
        0%, 100% {
            transform: translateY(-2px); /* Starts and ends slightly up */
        }
        50% {
            transform: translateY(2px); /* At the halfway point, it's at the lowest */
        }
    }

    @keyframes swirl {
        50% {
            transform: translate3D(7px, -5px, -5px);
        }
    }

    @keyframes vibrate {
        0%, 100% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(-2px); /* Move left */
        }
        50% {
            transform: translateX(2px); /* Move right */
        }
        75% {
            transform: translateX(-2px); /* Move left again */
        }
    }

    @keyframes slosh {
        0%,
        100% {
            clip-path: polygon(
                    0% 45%,
                    16% 44%,
                    33% 50%,
                    54% 60%,
                    70% 61%,
                    84% 59%,
                    100% 52%,
                    100% 100%,
                    0% 100%
            );
        }

        50% {
            clip-path: polygon(
                    0% 60%,
                    15% 65%,
                    34% 66%,
                    51% 62%,
                    67% 50%,
                    84% 45%,
                    100% 46%,
                    100% 100%,
                    0% 100%
            );
        }
    }

    .scroll-rainbow {
        min-height:100%;
        -webkit-background-clip: text;
        color: transparent;
        background-image:
                linear-gradient(rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100%);
        background-position: 0 0 ;
        background-size: 100% 200%;
        animation: slider 1s linear infinite;
    }

    @keyframes slider {
        to {background-position:0 -200%}
    }

    .scroll-fabulous {
        color: #fc7993;
        animation: bounce 1.5s infinite ease-in-out;
        display: inline-block;
    }

    .scroll-mad {
        color: #ac49c2;
        font-style: italic;
        text-decoration: underline;
        animation: slam 1.5s infinite ease-out;
        display: inline-block;
    }

    .scroll-ghost {
        color: #b6b6b6;
        animation: sway 1.5s infinite ease-in-out;
        display: inline-block;
    }

    .scroll-dizzy{
        animation: vibrate .5s infinite ease-in-out;
        display: inline-block;
    }

    .scroll-wave {
        animation: bounce 1.5s infinite ease-in-out;
        display: inline-block;
    }

    .scroll-blue {
        color:blue;
    }

    .scroll-red {
        color:red;
    }

    .scroll-green {
        color:green;
    }

    .scroll-yellow {
        color:yellow;
    }

    .scroll-purple {
        color:purple;
    }

    .scroll-italic {
        font-style: italic;
    }

    .scroll-bold {
        font-weight: bold;
    }

    /*TODO 💋kisses💋*/
    .scroll-kiss {

    }

    /*TODO ✨sprinkles✨*/
    .scroll-shine {

    }

    /*TODO 🎉party🎉*/
    .scroll-wow {

    }
</style>`
