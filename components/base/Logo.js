import * as React from "react"
import Svg, { Path } from "react-native-svg"

export default function Logo(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={134}
            height={80}
            fill="none"
            viewBox="0 0 134 80"
            {...props}
        >
            <Path
                fill="#FC1055"
                d="M38.573 44.778v15.927H0V0h16.414v44.778h22.16zM71.214 60.52l-.064-3.736c-1.452 1.225-3.282 2.205-5.492 2.94a21.077 21.077 0 01-6.755 1.103c-3.599 0-6.944-.98-10.038-2.88-3.093-1.96-5.492-4.532-7.323-7.84-1.831-3.308-2.715-6.922-2.715-10.842 0-3.982.947-7.596 2.778-10.904 1.83-3.308 4.42-5.88 7.702-7.78 3.283-1.898 6.881-2.817 10.795-2.817 2.147 0 4.167.367 6.061 1.041 1.894.674 3.41 1.654 4.546 2.88v-3.431h13.636l1.894 42.267H71.214zm-5.367-14.088a8.96 8.96 0 003.094-3.37 9.249 9.249 0 001.136-4.471c0-2.205-.694-3.982-2.146-5.452-1.452-1.47-3.283-2.205-5.43-2.205-2.398 0-4.482.796-6.313 2.45-1.83 1.654-2.714 3.614-2.714 5.88 0 1.41.379 2.757 1.2 4.044.82 1.347 1.83 2.389 3.093 3.185 1.262.796 2.588 1.225 3.977 1.225 1.389 0 2.778-.429 4.103-1.286z"
            />
            <Path
                fill="#FC1055"
                d="M133.331 17.09l-11.49 41.654c-2.02 6.8-4.987 12.068-8.901 15.743C109.026 78.162 104.48 80 99.303 80c-2.21 0-4.545-.306-7.007-.98a34.057 34.057 0 01-7.008-2.573l3.725-14.885c1.01.858 2.588 1.593 4.672 2.205 2.083.613 3.787.98 5.176.98 2.462 0 4.356-.98 5.682-3.001l-18.308-43.43 16.099-.368 8.396 23.583 6.313-23.706 16.288-.735z"
            />
        </Svg>
    );
}
