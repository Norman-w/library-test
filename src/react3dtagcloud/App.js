import React from 'react'
import TagCloud from 'react3dtagcloud'

export default class Demo extends React.Component {
    render() {
        const tagName = ['java', 'javscript', 'C', 'C++', '前端', 'React', 'Vue', 'redux', '写作', '程序员', '编程','中通','圆通','申通', '韵达', 'redux', '写作', '程序员', '编程','中通','圆通','申通', '韵达', 'redux', '写作', '程序员', '编程','中通','圆通','申通', '韵达']
        return (
            <div style={{ width: '1000px', height: '1000px' }}>
                <TagCloud tagName={tagName} radius={150} speed={13}></TagCloud>
            </div>
        )
    }
}